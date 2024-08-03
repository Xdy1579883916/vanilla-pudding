import type {
  AlovaDefaultCacheAdapter,
  AlovaGenerics,
  AlovaMethodCreateConfig,
  Method,
  MethodType,
  RequestBody,
  StatesExport,
} from 'alova'
import type { BooleanOptional, IStringifyOptions } from 'qs'

export declare class NamedStorageInstance {
  private store

  constructor()

  _get(np: string, keys?: string | string[] | {
    [key: string]: any
  } | null): Promise<any>

  set(np: string, key: string, value: any, expireTime?: number): Promise<void>

  setByKeyArr(np: string, keyArr: string[], value: any, { expired, joinStr }?: {
    expired?: number
    joinStr?: string
  }): Promise<void>

  get(np: string, key?: string): Promise<any>

  getByStrict(np: string, key?: string): Promise<any>

  findByReg(np: string, pattern: RegExp, mode?: 'keys' | 'values' | 'entries' | 'one'): Promise<any>

  remove(np: string, key: string): Promise<void>

  removeByKeys(np: string, keys: string[]): Promise<void>

  removeAll(np: string): Promise<void>

  removeByReg(np: string, pattern: RegExp): Promise<void>

  cleanAllExpireData(np: string): Promise<void>
}

export declare interface TSetByKeyArrOpt {
  expired?: number
  joinStr?: string
}

export declare type StorageType = 'sync' | 'local' | 'session'

export declare class StorageInstance {
  private store

  constructor(name: StorageType)

  _get(keys?: string | string[] | {
    [key: string]: any
  } | null): Promise<any>

  set(key: string, value: any, expireTime?: number): Promise<void>

  setByKeyArr(keyArr: string[], value: any, { expired, joinStr }?: TSetByKeyArrOpt): Promise<void>

  get(key?: string): Promise<any>

  getByStrict(key?: string): Promise<any>

  findByReg(pattern: RegExp, mode?: 'keys' | 'values' | 'entries' | 'one'): Promise<any>

  remove(key: string): Promise<void>

  removeByKeys(keys: string[]): Promise<void>

  removeAll(): Promise<void>

  removeByReg(pattern: RegExp): Promise<void>

  cleanAllExpireData(): Promise<void>
}

export declare interface TWdeCors {
  originValue: string
  refererValue: string
  monitorUrl: string
  monitorDomain?: string
  diyHeaders?: Array<{
    operation: 'append' | 'set' | 'remove'
    header: string
    value: string
  }>
}

export declare class RuleDNRTool {
  update(opt: any): Promise<void>

  rm(ids: number[] | undefined): Promise<void>

  clear(): Promise<void>

  get(id: number | undefined): Promise<any[]>

  addByHeader(opt: TWdeCors): Promise<void>

  rmByHeader(opt: TWdeCors): Promise<void>
}

type ResponseType =
  'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'stream'
  | 'formData'
  | 'base64'
  | 'charset_encode'
type ContentType = 'json' | 'form' | 'formData'
type FetchRequestInit = Omit<RequestInit, 'body' | 'headers' | 'method'>
interface Meta {
  cors: TWdeCors | string
  content_type: ContentType
  set_content_type: boolean
  response_type: ResponseType
  qs_options: IStringifyOptions<BooleanOptional>
  [k: string]: any
}
type Config =
  {
    meta?: Partial<Meta>
  }
  & AlovaMethodCreateConfig<AlovaGenerics<any, any, FetchRequestInit, Response, Headers, AlovaDefaultCacheAdapter, AlovaDefaultCacheAdapter, StatesExport>, any, any>

export declare function extRequest(type: MethodType, url: string, config?: Config, data?: RequestBody): Method<AlovaGenerics<any, any, FetchRequestInit, Response, Headers, AlovaDefaultCacheAdapter, AlovaDefaultCacheAdapter, StatesExport>>

export declare class BackgroundToolService {
  extSessionStore: StorageInstance
  extSyncStore: StorageInstance
  extLocalStore: StorageInstance
  extNamedStore: NamedStorageInstance
  ruleDNRTool: RuleDNRTool
  doRequest: typeof extRequest

  constructor()

  private bindMethods

  hello(msg?: string): Promise<string>

  download(option: chrome.downloads.DownloadOptions): Promise<number>

  cookieGet(option: chrome.cookies.Details): Promise<chrome.cookies.Cookie>

  cookieGetAll(option: chrome.cookies.GetAllDetails): Promise<chrome.cookies.Cookie[]>

  cookieSet(option: chrome.cookies.SetDetails): Promise<chrome.cookies.Cookie>

  cookieRemove(option: chrome.cookies.Details): Promise<chrome.cookies.Details>

  cookieGetAllStores(): Promise<chrome.cookies.CookieStore[]>

  getURL(path: string): Promise<string>

  tabsRemove(tabId: number): Promise<void>

  tabsQuery(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]>

  tabsOpenPageByURL(url: string): Promise<chrome.tabs.Tab>

  tabsCreate(createProperties: chrome.tabs.CreateProperties): Promise<chrome.tabs.Tab>

  tabsGetActive(): Promise<chrome.tabs.Tab[]>

  tabsGetActiveWindowId(): Promise<number>

  tabsCaptureActiveTab(opt: chrome.tabs.CaptureVisibleTabOptions): Promise<string>

  tabsUpdate(tabId: number, updateProperties: chrome.tabs.UpdateProperties): Promise<chrome.tabs.Tab>
}

export {}
