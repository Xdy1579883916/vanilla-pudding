import {guid} from "./guid";
import {BackgroundToolService, TWdeCors} from "./type";

const messagePrefix = "vanilla-pudding"

export function createMessageKey(name: string) {
    return [messagePrefix, name].join("-")
}

export const ExtManifestKey = createMessageKey("manifest")
export const Event4ChromeKey = createMessageKey("Event4Chrome")
export const Event4PageKey = createMessageKey("Event4Page")

export function emit(key: string, data: any, opt: any = {}) {
    const customEvent = new CustomEvent(key, {
        detail: data,
        bubbles: true,
        cancelable: true,
        ...opt,
    })
    document.dispatchEvent(customEvent)
}

export function listen(key: string, callback: (data: any) => void, options: any = {}) {
    document.addEventListener(key, callback, options);
}

function withResolvers() {
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    return {resolve, reject, promise};
}

export function compareVersion(version1: string, version2: string) {
    const arrayA: Array<any> = version1.split(".")
    const arrayB: Array<any> = version2.split(".")

    let pointer = 0
    while (pointer < arrayA.length && pointer < arrayB.length) {
        const res = arrayA[pointer] - arrayB[pointer]
        if (res === 0)
            pointer++
        else
            return res > 0 ? 1 : -1
    }
    // 若arrayA仍有小版本号
    while (pointer < arrayA.length) {
        if (+arrayA[pointer] > 0)
            return 1
        else
            pointer++
    }
    // 若arrayB仍有小版本号
    while (pointer < arrayB.length) {
        if (+arrayB[pointer] > 0)
            return -1
        else
            pointer++
    }
    // 版本号完全相同
    return 0
}

const __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
        const fulfilled = (value) => {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        };
        const rejected = (value) => {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        };
        const step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
    });
};

const createProxy = <T>(fun: any, path?: string): T => {
    const wrapped = () => {
    };
    const proxy: any = new Proxy(wrapped, {
        apply(_target, _thisArg, args) {
            return __async(this, null, function* () {
                return yield fun(path, ...args);
            });
        },
        get(target, propertyName, receiver) {
            if (propertyName === "__proxy" || typeof propertyName === "symbol") {
                return Reflect.get(target, propertyName, receiver);
            }
            return createProxy(fun, path == null ? propertyName : `${path}.${propertyName}`);
        }
    });
    proxy.__proxy = true;
    return proxy;
};

export class Extension {
    private callbacks: Map<string, any> = new Map()
    private id: string = guid()
    private ext = document.documentElement
    private version: any
    private active: boolean = false
    private install_listeners: any[] = []
    private close_listeners: any[] = []

    bgt: BackgroundToolService

    constructor() {
        // 插件注入很快，此时没有就是没有了
        if (this.ext.hasAttribute(ExtManifestKey)) {
            this.dispatchOnInstall()
        }

        // 需要为 bgt 使用 Proxy 创建虚拟的代理, 转发到 post 函数上
        this.bgt = createProxy<BackgroundToolService>(this.post.bind(this))
    }

    addOnInstallListener(listener: any, options = {once: true}) {
        this.install_listeners.push({listener, options});
        if (this.ext) {
            this.dispatchOnInstall();
        }
    }

    dispatchOnInstall() {
        this.active = true;
        this.install_listeners.forEach(({listener, options}) => {
            if (options && options.once) {
                this.install_listeners = this.install_listeners.filter((v) => v !== listener);
            }
            listener.call(this, options);
        });
    }

    addExtCloseListener(listener: any, options = {once: true}) {
        this.close_listeners.push({listener, options});
        if (!this.active) {
            this.dispatchExtClose();
        }
    }

    dispatchExtClose() {
        this.active = false;
        this.close_listeners.forEach(({listener, options}) => {
            if (options && options.once) {
                this.close_listeners = this.close_listeners.filter((v) => v !== listener);
            }
            listener.call(this, options);
        });
        this.close_listeners = [];
    }

    getVersion() {
        if (this.version) {
            return this.version;
        }
        if (!this.ext) {
            return null;
        }
        this.version = this.ext.getAttribute(ExtManifestKey) || ""
        return this.version;
    }

    async check(minVersion = null) {
        if (!this.active) {
            return Promise.reject({
                code: 502,
                message: "插件关闭了!"
            });
        }
        if (!this.ext) {
            return Promise.reject({
                code: 404,
                message: `install error`
            });
        }
        if (minVersion) {
            const version = this.getVersion();
            if (compareVersion(minVersion, version || "") > 0) {
                return Promise.reject({
                    code: 500,
                    message: `min version error ${minVersion}`,
                    data: {
                        minVersion,
                        version
                    }
                });
            }
        }
        return Promise.resolve(true);
    }

    post(funName: string, ...args: any[]) {
        return this.postAction({funName, args})
    }

    postByMinVersion(version: string, funName: string, ...args: any[]) {
        return this.postAction({funName, args}, version)
    }

    postAction(params: any, minVersion: any = null) {
        const {promise, resolve, reject} = withResolvers();
        const runner = async () => {
            const callbackId = guid()
            this.callbacks.set(callbackId, {resolve, reject});

            emit(Event4ChromeKey, Object.assign({}, {callbackId}, params))
            const win = window as any
            win.wdeListener || (win.wdeListener = new Map())
            if (!win.wdeListener.get(this.id)) {
                win.wdeListener.set(this.id, this);
                this.handle();
            }
            return promise;
        };
        return this.check(minVersion).then(runner);
    }

    handle() {
        const clear = (id: string) => {
            this.callbacks.delete(id);
        }
        listen(Event4PageKey, (event) => {
            const {detail} = event;
            const callback = this.callbacks.get(detail.callbackId);
            if (!detail.success && detail.msg.includes("插件关闭了")) {
                this.dispatchExtClose();
                callback.reject({
                    code: 502,
                    message: detail.msg
                });
                clear(detail.callbackId)
                return
            }
            if (callback) {
                callback.resolve(detail);
                clear(detail.callbackId)
            }
        })
    }
}

let ext: Extension

export function useExt(): Extension {
    if (!ext)
        ext = new Extension();
    return ext;
}

export function createCors(opt: TWdeCors) {
  return JSON.stringify(opt)
}
