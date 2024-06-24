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

export class RuleDNRTool {
    async update(opt: any): Promise<void> {
        await chrome.declarativeNetRequest.updateDynamicRules(opt);
    }

    async rm(ids: number[] | undefined): Promise<void> {
        if (ids && ids.length > 0) {
            await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: ids});
        }
    }

    async clear(): Promise<void> {
        const rules = await chrome.declarativeNetRequest.getDynamicRules();
        for (const rule of rules) {
            await this.rm([rule.id]);
        }
    }

    async get(id: number | undefined): Promise<any[]> {
        const rules = await chrome.declarativeNetRequest.getDynamicRules();
        return id !== undefined ? rules.filter(v => v.id === id) : rules;
    }

    async addByHeader(opt: TWdeCors): Promise<void> {
        const {originValue, refererValue, monitorUrl, monitorDomain, diyHeaders} = opt;
        const host = parseURL(monitorUrl).host;
        const id = parse2Hash(originValue);
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
        };
        await this.update({addRules: [rule], removeRuleIds: [id]});
    }

    async rmByHeader(opt: TWdeCors): Promise<void> {
        const {originValue} = opt;
        const id = parse2Hash(originValue);
        await this.rm([id]);
    }
}

// DNR: declarativeNetRequest
export const ruleDNRTool = new RuleDNRTool()
