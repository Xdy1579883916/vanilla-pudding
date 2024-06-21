import {getRow, parseJson} from "@/lib/tool.ts";
import {ruleDNRTool} from "@/lib/rules";
import {createAlova, Method, MethodType, RequestBody} from 'alova';
import GlobalFetch from 'alova/GlobalFetch';


// ResponseType
export type ResponseType =
    | "arraybuffer"
    | "blob"
    | "document"
    | "json"
    | "text"
    | "stream"
    | "formData"
    | "base64"
    | "charset_encode"


export type ContentType = "json" | "form" | "formData"

// ContentTypeMap
export const ContentTypeMap: Record<ContentType, string> = {
    json: "application/json;charset=UTF-8",
    form: "application/x-www-form-urlencoded;charset=UTF-8",
    formData: "multipart/form-data",
}

const alovaInstance = createAlova({
    requestAdapter: GlobalFetch(),
    timeout: 1000 * 60,
    async beforeRequest(method) {
        const cors = getRow(method, "config.meta.cors", null)
        if (cors) {
            await onBeforeSetCors(cors)
        }
        const content_type: ResponseType = getRow(method, "config.meta.content_type", "json")

        // 处理请求头
        method.config.headers = {
            'Content-Type': ContentTypeMap[content_type],
            ...(method.config.headers || {}),
        }

        if (method.type !== "GET") {
            // 处理流字段
            await doBlobFields(method.data)
        }

    },
    // 使用数组的两个项，分别指定请求成功的拦截器和请求失败的拦截器
    responded: {
        // 请求成功的拦截器
        // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
        // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
        onSuccess: async (response, method) => {
            console.log(method);
            const def_res_type = method.type === "POST" ? "json" : "text"
            const response_type: ResponseType = getRow(method, "config.meta.response_type", def_res_type)
            if (response.status >= 200 && response.status !== 204) {
                const contentType = getContentType(response)
                switch (response_type) {
                    case "arraybuffer":
                        return response.arrayBuffer();
                    case "blob":
                        return response.blob();
                    case "json":
                        return response.json();
                    case "formData":
                        return response.formData();
                    case "base64": {
                        const blob = await response.blob()
                        return blobToBase64(blob)
                    }
                    case "charset_encode": {
                        if (/(^|;)application\/json($|;)/i.test(contentType))
                            return charsetMatches(contentType, response, "json")
                        else if (/(^|;)text\/(.*)($|;)/i.test(contentType))
                            return charsetMatches(contentType, response, "text")
                        else
                            return response.text()
                    }
                    default:
                        return response.text();
                }
            }
            return response.text();
        },

        // 请求失败的拦截器
        // 请求错误时将会进入该拦截器。
        // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
        onError: (error, method) => {

        },

        // 请求完成的拦截器
        // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
        // 接收当前请求的method实例
        onComplete: async method => {
            const cors = getRow(method, "config.meta.cors", null)
            if (cors) {
                await onEndSetCors(cors)
            }
        }
    },
});


function check(data: any, type: string) {
    return Object.prototype.toString.call(data) === `[object ${type}]`
}

async function doBlobFields(data: any) {
    if (!check(data, "Object")) {
        return
    }

    const {blobFields = [], fileFields = []} = data as any
    for (const field of blobFields) {
        const value = data[field]
        data[field] = await fetch(value).then(res => res.blob())
    }
    for (const field of fileFields) {
        const value = data[field]
        const result = await fetch(value).then(res => res.blob())
        data[field] = new File([result], value.filename)
    }
    delete data.blobFields
    delete data.fileFields
}

export async function onBeforeSetCors(cors_value: string) {
    if (!cors_value)
        return
    const wde_cors = parseJson(cors_value)
    await ruleDNRTool.addByHeader(wde_cors)
}

export async function onEndSetCors(cors_value: string) {
    if (!cors_value)
        return
    const wde_cors = parseJson(cors_value)
    await ruleDNRTool.rmByHeader(wde_cors)
}

export interface TWdeCors {
    originValue: string
    refererValue: string
    monitorUrl: string
    diyHeaders?: Array<any>
}

export function createWdeCors(opt: TWdeCors) {
    return JSON.stringify(opt)
}

export function extRequest(
    type: MethodType,
    url: string,
    config?: {},
    data?: RequestBody
) {
    return new Method(type, alovaInstance, url, config, data)
}

function getContentType(response: Response) {
    return response.headers.get("content-type") || response.headers.get("Content-Type") || null
}

function getContentTypeObj(response: Response) {
    return response.headers["content-type"] || response.headers["Content-Type"] || null
}

function charsetMatches(contentType: string, stageOne: Response, dataType) {
    const matches = contentType.match(/.*charset=(.*)($|;)/i)
    if (matches && matches.length && matches[1]) {
        const charset = matches[1]
        return stageOne
            .blob()
            .then(blob => blobToText(blob, charset))
            .then((res: string) => {
                try {
                    if (dataType === "json")
                        return JSON.parse(res)
                    else
                        return res
                } catch (e) {
                    return res
                }
            })
    } else {
        if (dataType === "json")
            return stageOne.json()

        return stageOne.text()
    }
}

function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(blob)
    })
}

function blobToText(blob: Blob, encoding?: string | undefined) {
    return new Promise((resolve, _) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsText(blob, encoding)
    })
}

function base64ToBlob(code: string) {
    const parts = code.split(";base64,")
    let rawLength, contentType, raw
    if (parts.length > 1) {
        contentType = parts[0].split(":")[1]
        raw = window.atob(parts[1])
        rawLength = raw.length
    } else {
        raw = window.atob(parts[0])
        rawLength = raw.length
    }

    const uInt8Array = new Uint8Array(rawLength)
    for (let i = 0; i < rawLength; ++i)
        uInt8Array[i] = raw.charCodeAt(i)

    return new Blob([uInt8Array], {
        type: contentType,
    })
}
