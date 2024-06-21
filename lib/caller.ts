import {getRow} from "@/lib/tool.ts";

interface Result {
    success: boolean
    data?: any
    msg?: any
    // 插件需要用到
    callbackId?: string

    [k: string]: any
}

interface BackgroundAction {
    // 回调id
    callbackId: string
    // 方法名
    funName: string
    // 参数
    args: any[]

    [k: string]: any
}

type ChromeResultType = (callbackId: string, data: any, msg?: any) => Result

const extError: ChromeResultType = function (callbackId: string, data: any, msg?: any): Result {
    return {
        callbackId,
        success: false,
        data,
        msg,
    }
}

const extSuccess: ChromeResultType = function (callbackId: string, data: any, msg?: any): Result {
    return {
        callbackId,
        success: true,
        data,
        msg,
    }
}

export async function caller(backgroundTool: any, action: BackgroundAction): Promise<Result> {
    const {callbackId, funName, args} = action
    try {
        if (!callbackId || !funName) {
            throw new Error("不支持的脚本类型!")
        }
        const fun = getRow(backgroundTool, funName, null)
        if (!fun) {
            throw new Error("不支持的脚本类型!")
        }
        const res = await fun(...(args || []))
        return Promise.resolve(extSuccess(callbackId, res))
    } catch (e) {
        let msg = e.message || e || ""
        if (msg.includes("Extension context invalidated.")) {
            msg = "插件关闭了!"
        }

        return Promise.resolve(extError(callbackId, action, msg))
    }
}
