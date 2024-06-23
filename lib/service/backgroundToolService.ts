import {StorageInstance} from "@/lib/storage";
import {ruleDNRTool} from "@/lib/rules";
import {extRequest} from "@/lib/request";
import {NamedStorageInstance} from "@/lib/storage/NamedStorage";

export class BackgroundToolService {
    extSessionStore: any;
    extSyncStore: any;
    extLocalStore: any;
    extNamedStore: any;
    ruleDNRTool: any;
    doRequest: any;

    constructor() {
        // session sync local 存储库 API
        this.extSessionStore = new StorageInstance("session");
        this.extSyncStore = new StorageInstance("sync");
        this.extLocalStore = new StorageInstance("local");

        // 使用 IndexDB 实现, 类似local带命名空间隔离的 storage API
        this.extNamedStore = new NamedStorageInstance()

        // DNR API
        this.ruleDNRTool = ruleDNRTool

        // 请求 API
        this.doRequest = extRequest

        // 绑定所有方法以确保 `this` 上下文正确
        this.bindMethods(this.ruleDNRTool);
    }

    private bindMethods(objFun: any) {
        for (const key of Object.keys(objFun)) {
            if (typeof objFun[key] === 'function') {
                objFun[key] = objFun[key].bind(objFun);
            }
        }
    }

    hello(msg?: string) {
        return `hi, this your msg: [${msg || 'null'}]`;
    }

    // 下载文件
    download(option: chrome.downloads.DownloadOptions) {
        return chrome.downloads.download(option);
    }

    // cookie
    cookieGet(option: chrome.cookies.Details) {
        return chrome.cookies.get(option);
    }

    cookieGetAll(option: chrome.cookies.Details) {
        return chrome.cookies.getAll(option);
    }

    cookieSet(option: chrome.cookies.Details) {
        return chrome.cookies.set(option);
    }

    cookieRemove(option: chrome.cookies.Details) {
        return chrome.cookies.remove(option);
    }

    cookieGetAllStores() {
        return chrome.cookies.getAllCookieStores();
    }

    // source
    getURL(path: string) {
        return chrome.runtime.getURL(path);
    }

    // tab 相关
    tabsRemoveById(tabId: number) {
        return chrome.tabs.remove(tabId);
    }

    async tabsRemoveByURL(url: string) {
        const tabs = await chrome.tabs.query({url});
        for (const tab of tabs) {
            if (tab.url === url) {
                await this.tabsRemoveById(tab.id);
            }
        }
    }

    tabsOpenPageByURL(url: string) {
        return this.tabsCreate({url, active: true})
    }

    tabsCreate(createProperties: chrome.tabs.CreateProperties) {
        return chrome.tabs.create(createProperties);
    }

    tabsGetActive() {
        return chrome.tabs.query({active: true});
    }

    async tabsGetActiveWindowId() {
        const [firstTab] = await this.tabsGetActive();
        return firstTab?.windowId;
    }

    async tabsCaptureActiveTab(opt: chrome.tabs.CaptureVisibleTabOptions) {
        opt = Object.assign({format: "png"}, opt);
        const id = await this.tabsGetActiveWindowId();
        return chrome.tabs.captureVisibleTab(id, opt);
    }

    tabsUpdate(tabId: number, updateProperties: chrome.tabs.UpdateProperties) {
        return chrome.tabs.update(tabId, updateProperties);
    }
}
