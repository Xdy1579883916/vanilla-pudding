import { joinToStr, parseToReg } from '@/lib/tool'
import { first } from 'lodash-es'

export interface TSetByKeyArrOpt {
  expired?: number
  joinStr?: string
}

type StorageType = 'sync' | 'local' | 'session'

const StorageInsNameMap = {
  sync: chrome.storage.sync,
  local: chrome.storage.local,
  session: chrome.storage.session,
}

export class StorageInstance {
  private store: chrome.storage.SyncStorageArea | chrome.storage.LocalStorageArea | chrome.storage.SessionStorageArea

  constructor(name: StorageType) {
    this.store = StorageInsNameMap[name]
  }

  async _get(keys?: string | string[] | { [key: string]: any } | null): Promise<any> {
    return this.store.get(keys || null)
  }

  set(key: string, value: any, expireTime?: number): Promise<void> {
    const data: { [key: string]: any } = { [key]: value }
    if (expireTime) {
      data[`${key}_expire`] = Date.now() + expireTime * 864e5
    }
    return this.store.set(data)
  }

  setByKeyArr(keyArr: string[], value: any, { expired, joinStr = '_' }: TSetByKeyArrOpt = {}): Promise<void> {
    return this.set(joinToStr(keyArr, joinStr), value, expired)
  }

  async get(key?: string): Promise<any> {
    if (!key) {
      return this._get()
    }
    const item = await this._get([key, `${key}_expire`])
    return item[key] || null
  }

  async getByStrict(key?: string): Promise<any> {
    if (!key) {
      await this.cleanAllExpireData()
      return this._get()
    }

    const item = await this._get([key, `${key}_expire`])
    const expireTime = item[`${key}_expire`]
    if (expireTime && Date.now() >= Number(expireTime)) {
      await this.remove(key)
      return null
    }
    return item[key] || null
  }

  async findByReg(pattern: RegExp, mode: 'keys' | 'values' | 'entries' | 'one' = 'keys'): Promise<any> {
    const data = await this._get()
    const new_pattern = parseToReg(pattern)
    const keys = Object.keys(data).filter(key => new_pattern.test(key))

    switch (mode) {
      case 'values':
        return keys.map(key => data[key])
      case 'entries':
        return keys.reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
      case 'one': {
        const key = first(keys)
        return key ? data[key] : null
      }
      default:
        return keys
    }
  }

  remove(key: string): Promise<void> {
    return this.store.remove([key, `${key}_expire`])
  }

  removeByKeys(keys: string[]): Promise<void> {
    if (!keys.length)
      return Promise.resolve()
    const newKeys = keys.flatMap(key => [key, `${key}_expire`])
    return this.store.remove(newKeys)
  }

  removeAll(): Promise<void> {
    return this.store.clear()
  }

  async removeByReg(pattern: RegExp): Promise<void> {
    const keys: string[] = await this.findByReg(pattern)
    await this.removeByKeys(keys)
  }

  async cleanAllExpireData(): Promise<void> {
    const expiredObject = await this.findByReg(/.*_expire/, 'entries')
    const needRemoveKeys = Object.entries(expiredObject)
      .filter(([, expired]) => Date.now() >= Number(expired))
      .map(([k]) => k.replace('_expire', ''))

    await this.removeByKeys(needRemoveKeys)
  }
}
