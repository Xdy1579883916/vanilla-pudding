import { registerBackgroundScriptService } from '@/lib/rpc/backgroundScriptRPC'
import { registerBackgroundToolService } from '@/lib/rpc/backgroundToolRPC'
import { configureCSP, registerUserScript, unregisterAllUserScripts } from '@/lib/user-script'

export default defineBackground(() => {
  // 后台 worker 每5分钟就会休眠，所以定时唤醒一下
  function keepServiceWorkerAlive() {
    setInterval(async () => {
      await browser.runtime.getPlatformInfo()
    }, 4e3)
  }

  console.log('Hello background!', { id: browser.runtime.id })
  const backgroundScriptService = registerBackgroundScriptService()
  const backgroundToolService = registerBackgroundToolService()

  // eslint-disable-next-line no-restricted-globals
  Object.assign(self, {
    backgroundScriptService,
    backgroundToolService,
  })

  // eslint-disable-next-line no-restricted-globals
  console.log('background - service', self)

  const LaunchReason = {
    Install: 0,
    Update: 1,
    Enable: 2,
    Activate: 3,
  }
  const LaunchReasonMap = Object.fromEntries(Object.entries(LaunchReason).map(([k, v]) => [v, k]))

  const installDetailsPromise = new Promise((resolve) => {
    chrome.runtime.onInstalled.addListener(resolve)
  })

  class TimeoutError extends Error {
  }

  function timeout(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new TimeoutError('timeout')), ms)
    })
  }

  function assert(condition, message = 'Assertion failed') {
    if (!condition)
      throw new Error(message)
  }

  async function waitForLaunch() {
    const sessionStore = backgroundToolService.extSessionStore
    const activeFlagKey = '__ActiveFlag__'
    const isActive = await sessionStore.get(activeFlagKey)
    if (isActive) {
      return { reason: LaunchReason.Activate }
    }
    else {
      await sessionStore.set(activeFlagKey, true)
      try {
        const details = (await Promise.race([
          installDetailsPromise, // 在一般启动时, 该Promise永远不会完成,  他只在安装、更新时完成
          timeout(1000), // 如果超时, 说明是一般启动.
        ])) as chrome.runtime.InstalledDetails
        switch (details.reason) {
          case 'install': {
            return { reason: LaunchReason.Install }
          }
          case 'update': {
            assert(details.previousVersion, 'The details.previousVersion is undefined, which is unexpected.')
            return {
              reason: LaunchReason.Update,
              previousVersion: details.previousVersion,
            }
          }
          default: {
            return { reason: LaunchReason.Enable }
          }
        }
      }
      catch (e) {
        if (e instanceof TimeoutError) {
          return { reason: LaunchReason.Enable }
        }
        else {
          throw e
        }
      }
    }
  }

  async function migrate(previousVersion) {
    await pipeAsync(previousVersion)
  }

  async function pipeAsync(value, ...operators) {
    let result = await value
    for (const operator of operators) {
      result = await operator(result)
    }
    return result
  }

  waitForLaunch().then(async (details) => {
    console.info(`Launched by ${LaunchReasonMap[details.reason]}`, details)
    switch (details.reason) {
      case LaunchReason.Install: {
        // 在安装后初始化.
        break
      }
      case LaunchReason.Update: {
        // 在升级后执行迁移.
        await migrate(details.previousVersion)
        break
      }
    }
    try {
      keepServiceWorkerAlive()
      await configureCSP()
      await unregisterAllUserScripts()
      const enabledScripts = await backgroundScriptService.getAllEnabledUserScripts()
      for (const userScript of enabledScripts) {
        await registerUserScript(userScript)
      }
    }
    catch (e) {
      // 浏览器没有开启开发者模式
      console.error(e)
    }
  })
})
