import {StorageInstance} from "@/lib/storage";
import {RuleDNRTool} from "@/lib/rules";
import {extRequest} from "@/lib/request";
import {NamedStorageInstance} from "@/lib/storage/NamedStorage";

export class BackgroundToolService {
    extSessionStore: StorageInstance;
    extSyncStore: StorageInstance;
    extLocalStore: StorageInstance;
    extNamedStore: NamedStorageInstance;
    ruleDNRTool: RuleDNRTool;
    // 请求 API
    doRequest = extRequest;

    constructor() {
        // session sync local 存储库 API
        this.extSessionStore = new StorageInstance("session");
        this.extSyncStore = new StorageInstance("sync");
        this.extLocalStore = new StorageInstance("local");

        // 使用 IndexDB 实现, 类似local带命名空间隔离的 storage API
        this.extNamedStore = new NamedStorageInstance()

        // DNR API
        this.ruleDNRTool = new RuleDNRTool()


        // 绑定所有方法以确保 `this` 上下文正确
        this.bindMethods(this.ruleDNRTool);
        this.bindMethods(this.extNamedStore);
        this.bindMethods(this.extSessionStore);
        this.bindMethods(this.extSyncStore);
        this.bindMethods(this.extLocalStore);
    }

    private bindMethods(objFun: any) {
        for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(objFun))) {
            if (typeof objFun[key] === 'function') {
                objFun[key] = objFun[key].bind(objFun);
            }
        }
    }

    async hello(msg?: string) {
        return `hi, this your msg: [${msg || 'null'}]`;
    }

    // 下载文件
    async download(option: chrome.downloads.DownloadOptions) {
        return chrome.downloads.download(option);
    }

    // cookie
    async cookieGet(option: chrome.cookies.Details) {
        return chrome.cookies.get(option);
    }

    async cookieGetAll(option: chrome.cookies.GetAllDetails) {
        return chrome.cookies.getAll(option);
    }

    async cookieSet(option: chrome.cookies.SetDetails) {
        return chrome.cookies.set(option);
    }

    async cookieRemove(option: chrome.cookies.Details) {
        return chrome.cookies.remove(option);
    }

    async cookieGetAllStores() {
        return chrome.cookies.getAllCookieStores();
    }

    // source
    async getURL(path: string) {
        return chrome.runtime.getURL(path);
    }

    // tab 相关
    async tabsRemove(tabId: number) {
        return chrome.tabs.remove(tabId);
    }

    async tabsQuery(queryInfo: chrome.tabs.QueryInfo) {
        return chrome.tabs.query(queryInfo || {})
    }

    async tabsOpenPageByURL(url: string) {
        return this.tabsCreate({url, active: true})
    }

    async tabsCreate(createProperties: chrome.tabs.CreateProperties) {
        return chrome.tabs.create(createProperties);
    }

    async tabsGetActive() {
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

    async tabsUpdate(tabId: number, updateProperties: chrome.tabs.UpdateProperties) {
        return chrome.tabs.update(tabId, updateProperties);
    }
}
