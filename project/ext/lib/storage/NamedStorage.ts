import Dexie from 'dexie'
import { first } from 'lodash-es'
import { check, joinToStr, parseToReg } from '@/lib/tool.ts'

interface StorageItem {
  namespace: string
  key: string
  value: any
}

export class NamespaceStorage extends Dexie {
  private data: Dexie.Table<StorageItem, [string, string]>

  constructor() {
    super('NamespaceStorage')
    this.version(1).stores({
      data: '[namespace+key], namespace, key',
    })
    this.data = this.table('data')
  }

  async getAll(namespace: string): Promise<{ [key: string]: any }> {
    if (!namespace) {
      return null
    }
    const items = await this.data.where('namespace').equals(namespace).toArray()
    return items.reduce((acc, cur) => {
      acc[cur.key] = cur.value
      return acc
    }, {})
  }

  async get(namespace: string, keys?: string | string[] | { [key: string]: any } | null): Promise<{
    [key: string]: any
  }> {
    if (!keys) {
      return this.getAll(namespace)
    }

    if (check(keys, 'String')) {
      keys = [keys]
    }

    if (check(keys, 'Object')) {
      keys = Object.keys(keys)
    }

    if (Array.isArray(keys)) {
      const items = await this.data.where('[namespace+key]').anyOf(keys.map(key => [namespace, key])).toArray()
      return items.reduce((result, item) => {
        result[item.key] = item.value
        return result
      }, {})
    }

    return null
  }

  async set(namespace: string, items: { [key: string]: any }): Promise<void> {
    const dataToPut = Object.keys(items).map(key => ({ namespace, key, value: items[key] }))
    await this.data.bulkPut(dataToPut)
  }

  async remove(namespace: string, keys: string | string[]): Promise<void> {
    if (typeof keys === 'string') {
      keys = [keys]
    }
    await this.data.bulkDelete(keys.map(key => [namespace, key]))
  }

  async clear(namespace: string): Promise<void> {
    await this.data.where('namespace').equals(namespace).delete()
  }

  async keys(namespace: string): Promise<string[]> {
    return (await this.data.where('namespace').equals(namespace).primaryKeys()).map(([namespace, key]) => key)
  }

  async length(namespace: string): Promise<number> {
    return this.data.where('namespace').equals(namespace).count()
  }
}

export class NamedStorageInstance {
  private store: NamespaceStorage

  constructor() {
    this.store = new NamespaceStorage()
  }

  async _get(np: string, keys?: string | string[] | { [key: string]: any } | null): Promise<any> {
    return this.store.get(np, keys || null)
  }

  set(np: string, key: string, value: any, expireTime?: number): Promise<void> {
    const data: { [key: string]: any } = { [key]: value }
    if (expireTime) {
      data[`${key}_expire`] = Date.now() + expireTime * 864e5
    }
    return this.store.set(np, data)
  }

  setByKeyArr(np: string, keyArr: string[], value: any, { expired, joinStr = '_' }: {
    expired?: number
    joinStr?: string
  } = {}): Promise<void> {
    return this.set(np, joinToStr(keyArr, joinStr), value, expired)
  }

  async get(np: string, key?: string): Promise<any> {
    if (!key) {
      return this._get(np)
    }
    const item = await this._get(np, [key, `${key}_expire`])
    return item[key] || null
  }

  async getByStrict(np: string, key?: string): Promise<any> {
    if (!key) {
      await this.cleanAllExpireData(np)
      return this._get(np)
    }

    const item = await this._get(np, [key, `${key}_expire`])
    const expireTime = item[`${key}_expire`]
    if (expireTime && Date.now() >= Number(expireTime)) {
      await this.remove(np, key)
      return null
    }
    return item[key] || null
  }

  async findByReg(np: string, pattern: RegExp, mode: 'keys' | 'values' | 'entries' | 'one' = 'keys'): Promise<any> {
    const data = await this._get(np)
    const new_pattern = parseToReg(pattern)
    const keys = Object.keys(data).filter(key => new_pattern.test(key))

    switch (mode) {
      case 'values':
        return keys.map(key => data[key])
      case 'entries':
        return keys.reduce((acc, key) => ({ ...acc, [key]: data[key] }), {})
      case 'one':{
        const key = first(keys)
        return key ? data[key] : null
      }
      default:
        return keys
    }
  }

  remove(np: string, key: string): Promise<void> {
    return this.store.remove(np, [key, `${key}_expire`])
  }

  removeByKeys(np: string, keys: string[]): Promise<void> {
    if (!keys.length)
      return Promise.resolve()
    const newKeys = keys.flatMap(key => [key, `${key}_expire`])
    return this.store.remove(np, newKeys)
  }

  removeAll(np: string): Promise<void> {
    return this.store.clear(np)
  }

  async removeByReg(np: string, pattern: RegExp): Promise<void> {
    const keys: string[] = await this.findByReg(np, pattern)
    await this.removeByKeys(np, keys)
  }

  async cleanAllExpireData(np: string): Promise<void> {
    const expiredObject = await this.findByReg(np, /.*_expire/, 'entries')
    const needRemoveKeys = Object.entries(expiredObject)
      .filter(([, expired]) => Date.now() >= Number(expired))
      .map(([k]) => k.replace('_expire', ''))

    await this.removeByKeys(np, needRemoveKeys)
  }
}
