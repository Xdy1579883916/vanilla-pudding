import {createStorageIns} from "@/lib/storage";

export class BackgroundToolService {
    extSessionStore: any;
    extSyncStore: any;
    extLocalStore: any;

    constructor() {
        this.extSessionStore = createStorageIns("session");
        this.extSyncStore = createStorageIns("sync");
        this.extLocalStore = createStorageIns("local");

        // Bind all methods to ensure `this` context is correct
        this.bindMethods(this.extSessionStore);
        this.bindMethods(this.extSyncStore);
        this.bindMethods(this.extLocalStore);
    }

    private bindMethods(store: any) {
        for (const key of Object.keys(store)) {
            if (typeof store[key] === 'function') {
                store[key] = store[key].bind(store);
            }
        }
    }

    hello() {
        return "hi this is BackgroundToolService";
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
