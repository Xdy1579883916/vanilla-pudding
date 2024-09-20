import type { TWdeCors } from '@/lib/rules'
import type { BooleanOptional, IStringifyOptions } from 'qs'
import type { Method } from 'quick-fy'
import { ruleDNRTool } from '@/lib/rules'
import { check, getRow, parseJson } from '@/lib/tool.ts'
import { upperCase } from 'lodash-es'
import qs from 'qs'
import { createFy, getContentType } from 'quick-fy'

type ResponseType =
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'
  | 'formData'
  | 'base64'
  | 'charset_encode'

type ContentType = 'json' | 'form' | 'formData'

const ContentTypeMap: Record<ContentType, string> = {
  json: 'application/json;charset=UTF-8',
  form: 'application/x-www-form-urlencoded;charset=UTF-8',
  formData: 'multipart/form-data',
}

type Arg = Record<string, any> | string
type MethodType = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'PATCH'

const fy = createFy({
  async beforeRequest(method: Method) {
    let url = getRow(method, 'url', '')
    const config = getRow(method, 'config', {})
    const meta = getRow(method, 'meta', {})

    const cors = getRow(meta, 'cors', null)
    if (cors) {
      await onBeforeSetCors(cors)
    }
    const content_type: ContentType = getRow(meta, 'content_type', 'json')
    const qs_options = getRow(meta, 'qs_options', {})
    const set_content_type: ContentType = getRow(meta, 'set_content_type', true)
    const params = getRow(meta, 'params', null)

    const ContentType = ContentTypeMap[content_type]

    let data = config?.body

    // 设置 ContentType
    function setContentType() {
      if (!set_content_type)
        return {}
      if (content_type === 'formData' && check(data, 'Object')) {
        const field = ['blobFields', 'fileFields']
        // 检查formData是否包含文件字段
        const hasFile = !!Object.keys(data).filter(v => field.includes(v)).length
        if (hasFile)
          return {}
      }
      return ContentType ? { 'content-type': ContentType } : {}
    }

    // 处理请求头
    config.headers = {
      ...(setContentType()),
      ...(config.headers || {}),
    }

    if (config.method !== 'GET') {
      // 处理流字段
      await doBlobFields(data)
    }

    // 处理body数据
    data = parseDataByContentType(content_type, data, qs_options)

    // 处理 url params
    if (params) {
      const textSearchParams = typeof params === 'string'
        ? params.replace(/^\?/, '')
        : qs.stringify(params, { encode: false })
      const searchParams = `?${textSearchParams}`
      url = url.replace(/(?:\?.*?)?(?=#|$)/, searchParams)
    }

    return {
      url,
      config: {
        ...config,
        body: data,
      },
      meta,
    }
  },
  responded: {
    // 请求成功的拦截器
    // 当使用GlobalFetch请求适配器时，第一个参数接收Response对象
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onSuccess: async (response, method: Method) => {
      const methodType = getRow(method, 'config.method', 'GET')
      const def_res_type = methodType === 'POST' ? 'json' : 'text'
      const response_type: ResponseType = getRow(method, 'meta.response_type', def_res_type)
      if (response.status >= 200 && response.status !== 204) {
        const contentType = getContentType(response)
        switch (response_type) {
          case 'arraybuffer':
            return response.arrayBuffer()
          case 'blob':
            return response.blob()
          case 'json':
            return response.json()
          case 'formData':
            return response.formData()
          case 'base64': {
            const blob = await response.blob()
            return blobToBase64(blob)
          }
          case 'charset_encode': {
            if (/(^|;)application\/json($|;)/i.test(contentType))
              return charsetMatches(contentType, response, 'json')
            else if (/(^|;)text\/(.*)($|;)/i.test(contentType))
              return charsetMatches(contentType, response, 'text')
            else
              return response.text()
          }
          default:
            return response.text()
        }
      }
      return response.text()
    },

    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: (error, method) => {
      throw error
    },

    // 请求完成的拦截器
    // 当你需要在请求不论是成功、失败、还是命中缓存都需要执行的逻辑时，可以在创建alova实例时指定全局的`onComplete`拦截器，例如关闭请求 loading 状态。
    // 接收当前请求的method实例
    onComplete: async (method) => {
      const cors = getRow(method, 'meta.cors', null)
      if (cors) {
        await onEndSetCors(cors)
      }
    },
  },
})

/**
 * 根据设置的 ContentType 格式化当前data 对象的格式
 * @param content_type
 * @param data
 * @param qs_options
 */
function parseDataByContentType(content_type: ContentType, data: any, qs_options?: any) {
  switch (content_type) {
    case 'form': {
      if (typeof data === 'string')
        return data

      return qs.stringify(data, qs_options)
    }
    case 'formData': {
      const formData: FormData = new FormData()
      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value as any)
      }
      return formData
    }
    default: {
      if (check(data, 'Object') || check(data, 'Array')) {
        return JSON.stringify(data)
      }
      return data
    }
  }
}

async function doBlobFields(data: any) {
  if (!check(data, 'Object')) {
    return
  }

  const { blobFields = [], fileFields = [] } = data as any
  for (const field of blobFields) {
    const value = data[field]
    data[field] = await fetch(value).then(res => res.blob())
  }
  for (const field of fileFields) {
    const value = data[field]
    const result = await fetch(value.uri).then(res => res.blob())
    data[field] = new File([result], value.filename)
  }
  delete data.blobFields
  delete data.fileFields
}

async function onBeforeSetCors(cors_value: string) {
  if (!cors_value)
    return
  const cors = parseJson(cors_value)
  await ruleDNRTool.addByHeader(cors)
}

async function onEndSetCors(cors_value: string) {
  if (!cors_value)
    return
  const cors = parseJson(cors_value)
  await ruleDNRTool.rmByHeader(cors)
}

interface Meta {
  // 跨域设置、请求头修改等
  cors: TWdeCors | string
  // 设置请求的 ContentType, 会根据 ContentType 进行数据格式化
  content_type: ContentType
  // 控制是否设置 ContentType
  set_content_type: boolean
  // 控制响应数据类型
  response_type: ResponseType
  // 设置 qs 的配置
  qs_options: IStringifyOptions<BooleanOptional>
  // 设置请求URL参数
  params?: Arg
  [k: string]: any
}

type Config = {
  meta?: Partial<Meta>
  params?: Arg
} & Omit<RequestInit, 'body'>

/**
 * 兼容旧版的请求
 * @deprecated 后续请使用 extRequestFy 代替
 */
export function extRequest(
  type: MethodType,
  url: string,
  config?: Config,
  data?: BodyInit,
) {
  const method = upperCase(type) as MethodType
  const { meta, params, ...other } = config || {}
  return fy.request(
    url,
    {
      ...(other || {}),
      method,
      body: data,
    },
    {
      ...(meta || {}),
      params,
    },
  )
}

export function extRequestFy(
  type: MethodType,
  url: string,
  config?: RequestInit,
  meta?: Partial<Meta>,
) {
  const method = upperCase(type || 'GET') as MethodType
  return fy.request(
    url,
    {
      ...(config || {}),
      method,
    },
    meta,
  )
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
          if (dataType === 'json')
            return JSON.parse(res)
          else
            return res
        }
        catch (e) {
          return res
        }
      })
  }
  else {
    if (dataType === 'json')
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
  const parts = code.split(';base64,')
  let rawLength, contentType, raw
  if (parts.length > 1) {
    contentType = parts[0].split(':')[1]
    raw = window.atob(parts[1])
    rawLength = raw.length
  }
  else {
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
