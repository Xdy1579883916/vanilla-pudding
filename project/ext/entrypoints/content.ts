import { Event4ChromeKey, Event4PageKey, ExtManifestKey, emit, listen } from '@vanilla-pudding/message'
import { getBackgroundToolService } from '@/lib/rpc/backgroundToolRPC.ts'
import { caller } from '@/lib/caller.ts'

export default defineContentScript({
  matches: ['<all_urls>'],
  allFrames: true,
  // 需要尽可能快地提供通讯支持
  runAt: 'document_start',
  async main() {
    const backgroundTool = getBackgroundToolService()
    const info = chrome.runtime.getManifest()
    console.log('Hello content.', info.version)

    if (!document.documentElement) {
      return
    }

    // 1、为dom 添加初始化完成标记
    document.documentElement.setAttribute(ExtManifestKey, info.version)
    // 2、为 document 添加获取插件清单的监听事件
    listen(ExtManifestKey, async (event: any) => {
      console.log('收到 ExtManifestKey', event)
      emit(Event4PageKey, info)
    })
    // 创建事件监听
    listen(Event4ChromeKey, async (event: any) => {
      console.log('收到 Event4ChromeKey', event)
      const { detail } = event || {}
      const res = await caller(backgroundTool, detail)
      // 处理完成之后, 返回数据给调用方
      emit(Event4PageKey, res)
    })
  },
})
