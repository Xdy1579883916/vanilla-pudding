import {parse2Hash, parseURL} from "@/lib/tool"

enum RuleActionType {
    BLOCK = "block",
    REDIRECT = "redirect",
    ALLOW = "allow",
    UPGRADE_SCHEME = "upgradeScheme",
    MODIFY_HEADERS = "modifyHeaders",
    ALLOW_ALL_REQUESTS = "allowAllRequests",
}


/** 这描述了网络请求的资源类型. */
enum ResourceType {
    MAIN_FRAME = "main_frame",
    SUB_FRAME = "sub_frame",
    STYLESHEET = "stylesheet",
    SCRIPT = "script",
    IMAGE = "image",
    FONT = "font",
    OBJECT = "object",
    XMLHTTPREQUEST = "xmlhttprequest",
    PING = "ping",
    CSP_REPORT = "csp_report",
    MEDIA = "media",
    WEBSOCKET = "websocket",
    OTHER = "other",
}

/** 这描述了“modifyHeaders”规则的可能操作. */
enum HeaderOperation {
    APPEND = "append",
    SET = "set",
    REMOVE = "remove",
}

const AllResourceType: ResourceType[] = [
    ResourceType.MAIN_FRAME,
    ResourceType.SUB_FRAME,
    ResourceType.STYLESHEET,
    ResourceType.SCRIPT,
    ResourceType.IMAGE,
    ResourceType.FONT,
    ResourceType.OBJECT,
    ResourceType.XMLHTTPREQUEST,
    ResourceType.PING,
    ResourceType.CSP_REPORT,
    ResourceType.MEDIA,
    ResourceType.WEBSOCKET,
    ResourceType.OTHER,
]

interface TWdeCors {
    originValue: string
    refererValue: string
    monitorUrl: string
    monitorDomain: string
    diyHeaders: {
        operation: "append" | "set" | "remove"
        header: string
        value: string
    }[]
}

// DNR: declarativeNetRequest
export const ruleDNRTool = {
    async update(opt: any) {
        await chrome.declarativeNetRequest.updateDynamicRules(opt)
    },
    async rm(ids: number[] | undefined) {
        await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: ids})
    },
    async clear() {
        const rules = await chrome.declarativeNetRequest.getDynamicRules()
        for (const r in rules) {
            await chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [rules[r].id],
            })
        }
    },
    async get(id: number | undefined) {
        const rules = await chrome.declarativeNetRequest.getDynamicRules()
        return id ? rules.filter(v => v.id === id) : rules
    },
    async addByHeader(opt: TWdeCors) {
        const {originValue, refererValue, monitorUrl, monitorDomain, diyHeaders} = opt
        const {host} = parseURL(monitorUrl)
        // 根据domain创建id, 因为插件的动态规则数量有限制
        const id = parse2Hash(originValue)
        const rule = {
            id,
            priority: 3,
            action: {
                type: RuleActionType.MODIFY_HEADERS,
                requestHeaders: [
                    {header: "wde_cors", operation: HeaderOperation.REMOVE},
                    {header: "Origin", operation: HeaderOperation.SET, value: originValue},
                    {header: "Referer", operation: HeaderOperation.SET, value: refererValue},
                    ...(diyHeaders || []),
                ],
            },
            condition: {
                urlFilter: `*${host}*`,
                resourceTypes: AllResourceType,
            },
        }
        return this.update({
            addRules: [rule],
            removeRuleIds: [id],
        })
    },
    async rmByHeader(opt: TWdeCors) {
        const {originValue, refererValue, monitorUrl, monitorDomain} = opt
        // 根据domain创建id, 因为插件的动态规则数量有限制
        const id = parse2Hash(originValue)
        return this.rm([id])
    },
}
