import { get, isArray, isBoolean, isNil, isNumber } from "lodash-es"

export function getRow(row: any, path: string | string[], defaultValue: any = "-", parseFun?: (...arg: any) => unknown) {
    const value: any = get(row, path)
    if (!isNil(value) && parseFun)
        return fmt(parseFun(value), defaultValue)

    return fmt(value, defaultValue)
}

function fmt(v: any, defaultValue: any) {
    if (isNumber(v) || isBoolean(v))
        return v
    return v || defaultValue
}

export function parseArr(data, spec = false) {
    if (Array.isArray(data))
        return data

    if (data) {
        try {
            if (isJSONStr(data))
                return JSON.parse(data)

            if (spec) {
                return data
                    .replace(/^\[|\]$/g, "")
                    .split(/,/)
                    .map(v => v.trim())
            }
            return []
        }
        catch (e) {
            return []
        }
    }
    else {
        return []
    }
}

export function isJSONStr(str: string) {
    try {
        JSON.parse(str)
        return true
    }
    catch (e) {
        return false
    }
}

// 安全的解析json
export function parseJson(data: any): any {
    if (typeof data === "object")
        return data || {}
    try {
        return JSON.parse(data) || {}
    }
    catch (e) {
        return {}
    }
}

export function parseFilterArr(arr) {
    return parseArr(arr).filter(Boolean)
}

export function appendProtocol(url, protocol = "https:") {
    if (/^\/\//.test(url))
        return protocol + url
    else if (!/:\/\//.test(url))
        return `${protocol}//${url}`
    else
        return url
}

export function parseURL(url) {
    const getHostName = (url2) => {
        const match = url2.match(/:\/\/(www\d?\.)?(.[^/:]+)/i)
        if (match != null && match.length > 2 && typeof match[2] === "string" && match[2].length > 0)
            return match[2]
        else return null
    }
    const getDomain = (url2) => {
        const hostName = getHostName(url2)
        let domain = hostName
        if (hostName != null) {
            const parts = hostName.split(".").reverse()
            if (parts != null && parts.length > 1) {
                domain = `${parts[1]}.${parts[0]}`
                if (hostName.toLowerCase().includes(".co.uk") && parts.length > 2)
                    domain = `${parts[2]}.${domain}`
            }
        }
        return domain
    }
    const a = new URL(appendProtocol(url))
    return {
        href: url,
        url: `${a.protocol}//${a.hostname}${a.pathname.replace(/^([^/])/, "/$1")}${a.search}`,
        origin: `${a.protocol}//${a.hostname}`,
        protocol: a.protocol,
        host: a.hostname,
        port: a.port,
        pathname: a.pathname.replace(/^([^/])/, "/$1"),
        search: a.search,
        hash: a.hash.replace("#", ""),
        params: (function () {
            const ret = {}
            const seg = a.search.replace(/^\?/, "").split("&")
            const len = seg.length
            let i = 0
            for (; i < len; i++) {
                if (!seg[i])
                    continue

                const [key, value] = seg[i].split("=")
                ret[key] = value
            }
            return ret
        })(),
        file: (a.pathname.match(/\/([^/?#]+)$/i) || [""])[1],
        domain: getDomain(url),
    }
}

export function parse2Hash(data: any): number {
    const str = String(data || "")

    let hash = 0
    let i
    let chr
    if (str.length === 0)
        return hash
    for (i = 0; i < str.length; i++) {
        chr = str.charCodeAt(i)
        hash = (hash << 5) - hash + chr
        hash |= 0
    }
    return Math.abs(hash)
}

export function joinToStr(arr, joinStr = "_", filter = true) {
    let _tempArr = arr
    let _result = ""
    if (isArray(arr)) {
        filter && (_tempArr = _tempArr.filter(Boolean))
        _result = _tempArr.join(joinStr)
    }
    else {
        _result = JSON.stringify(_tempArr)
    }
    return _result
}

export function clone(...args) {
    function fn(v) {
        return typeof v === "object" && v !== null ? JSON.parse(JSON.stringify(v)) : v
    }

    return args.length > 1 ? args.map(v => fn(v)) : fn(args[0])
}

export function parseToReg(pattern) {
    return new RegExp(pattern)
}
