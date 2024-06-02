import {registerBackgroundService} from "@/lib/rpc/bg_service";
import {SessionStorage} from "@/lib/SessionStorage";
import {configureCSP, registerUserScript, unregisterAllUserScripts} from "@/lib/user-script";
import {BackgroundService} from "@/lib/backgroundService";

export default defineBackground(() => {
    console.log('Hello background!', {id: browser.runtime.id});

    const backgroundService = new BackgroundService()

    self.backgroundService = backgroundService
    console.log("backgroundService", self)

    const LaunchReason = {
        Install: 0,
        Update: 1,
        Enable: 2,
        Activate: 3,
    }
    const LaunchReasonMap = Object.fromEntries(Object.entries(LaunchReason).map(([k, v]) => [v, k]))

    const installDetailsPromise = new Promise((resolve) => {
        chrome.runtime.onInstalled.addListener(resolve);
    });

    class TimeoutError extends Error {
    }

    function timeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => reject(new TimeoutError("timeout")), ms);
        });
    }

    function assert(condition, message = "Assertion failed") {
        if (!condition)
            throw new Error(message);
    }

    async function waitForLaunch() {
        const activeFlagKey = "__ActiveFlag__";
        const storage = new SessionStorage();
        if (await storage.getItem(activeFlagKey)) {
            return {reason: LaunchReason.Activate};
        } else {
            await storage.setItem(activeFlagKey, true);
            try {
                const details = await Promise.race([
                    installDetailsPromise, // 在一般启动时, 该Promise永远不会完成,  他只在安装、更新时完成
                    timeout(1000) // 如果超时, 说明是一般启动.
                ]);
                switch (details.reason) {
                    case "install": {
                        return {reason: LaunchReason.Install};
                    }
                    case "update": {
                        assert(details.previousVersion, "The details.previousVersion is undefined, which is unexpected.");
                        return {
                            reason: LaunchReason.Update,
                            previousVersion: details.previousVersion
                        };
                    }
                    default: {
                        return {reason: LaunchReason.Enable};
                    }
                }
            } catch (e) {
                if (e instanceof TimeoutError) {
                    return {reason: LaunchReason.Enable};
                } else {
                    throw e;
                }
            }
        }
    }

    async function migrate(previousVersion) {
        await pipeAsync(previousVersion);
    }

    async function pipeAsync(value, ...operators) {
        let result = await value;
        for (const operator of operators) {
            result = await operator(result);
        }
        return result;
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
        registerBackgroundService()
        await configureCSP()
        await unregisterAllUserScripts()
        const enabledScripts = await backgroundService.getAllEnabledUserScripts()
        for (const userScript of enabledScripts) {
            await registerUserScript(userScript)
        }
    })
});
