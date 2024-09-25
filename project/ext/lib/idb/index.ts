import type { IndexableType, Table } from 'dexie'
import { isUserScriptsAPIAvailable } from '@/lib/user-script'
import { guid } from '@/util/guid'
import { Dexie } from 'dexie'
import { trim, uniq } from 'lodash-es'

class Database extends Dexie {
  userScripts: Table<any, IndexableType, any>

  constructor() {
    super('Database')
    this.version(1).stores({ userScripts: '++id, enabled' })
    this.version(2).stores({ userScripts: 'id, enabled' }).upgrade(async () => {
      await this.table('userScripts').toCollection().modify((userScript) => {
        userScript.id = guid()
        delete userScript.name
        delete userScript.urlPatterns
      })
    })
    this.version(3).stores({ userScripts: 'id, enabled' }).upgrade(async () => {
      await this.table('userScripts').toCollection().modify((userScript) => {
        userScript.id = guid()
      })
    })
    this.userScripts = this.table('userScripts')
  }
}

// 单复数映射
const metaNamesMap = {
  matches: 'match',
  excludeMatches: 'excludeMatch',
  excludeGlobs: 'excludeGlob',
  includeGlobs: 'includeGlob',
  updateURLs: 'updateUrl',
}

export class ScriptDAO {
  private db: Database

  constructor() {
    this.db = new Database()
  }

  async getAllUserScripts() {
    const objects = await this.db.userScripts.toArray()
    return objects.map(convertUserScriptObjectToUserScript)
  }

  isSupportAPI() {
    return isUserScriptsAPIAvailable()
  }

  async getAllEnabledUserScripts(): Promise<any[]> {
    const objects = await this.db.userScripts.where('enabled').equals(
      1,
      /* True */
    ).toArray()
    return objects.map(convertUserScriptObjectToUserScript)
  }

  async getUserScript(id) {
    const object2 = await this.db.userScripts.get(id)
    if (object2) {
      return convertUserScriptObjectToUserScript(object2)
    }
    else {
      return null
    }
  }

  async deleteUserScript(id) {
    await this.db.userScripts.delete(id)
  }

  async updateUserScriptEnabled(id, enabled) {
    await this.db.userScripts.update(id, {
      enabled: enabled ? 1 : 0,
      /* False */
    })
  }

  async upsertUserScript(id, code) {
    const newCode = fmtCodeByMeta(code)

    await this.db.transaction('rw', this.db.userScripts, async () => {
      const object2 = await this.db.userScripts.get(id)
      if (object2) {
        await this.db.userScripts.update(id, {
          code: newCode,
        })
      }
      else {
        await this.db.userScripts.add({
          id,
          code: newCode,
          enabled: 1,
          /* True */
        })
      }
    })
  }
}

function convertUserScriptObjectToUserScript(obj): any {
  const metadata = parseMetadata(obj.code)
  return {
    ...metadata,
    id: obj.id,
    code: obj.code,
    enabled: obj.enabled === 1,
  }
}

function fmtCodeByMeta(code) {
  const meta = parseMetadata(code)

  for (const [metaNamePlural, metaNameSingular] of Object.entries(metaNamesMap)) {
    meta[metaNameSingular] = meta[metaNamePlural]
    delete meta[metaNamePlural]
  }
  return generateMetaStr(meta) + removeMetaInCode(code)
}

function removeMetaInCode(code) {
  return code.replace(/^\/\/\s*@(?<key>\S+)(?<value>.+?$|$)/gm, '').replace(/[\r\n]+/gi, '\n')
}

function generateMetaStr(scriptMeta) {
  return Object.entries(scriptMeta).reduce((pre, [k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((item) => {
        pre += `// @${k} ${item}\n`
      })
    }
    else {
      pre += `// @${k} ${v}\n`
    }
    return pre
  }, '')
}

export function parseMetadata(code) {
  const opt = {
    name: 'new-script',
    runAt: 'document_idle',
    matches: [],
    excludeMatches: [],
    excludeGlobs: [],
    includeGlobs: [],
    updateURLs: [],
    allFrames: false, // true, false
    world: 'USER_SCRIPT', // MAIN, USER_SCRIPT
    runWith: 'esm', // esm | raw
  }
  for (const { key, value } of parseMetadataLines(code)) {
    switch (key) {
      case 'name': {
        opt.name = value || 'new-script'
        break
      }
      case 'run-at':
      case 'runAt': {
        opt.runAt = checkMetadata(['document_idle', 'document_end', 'document_start'], value)
        break
      }
      case 'all-frames':
      case 'allFrames': {
        opt.allFrames = value === 'true'
        break
      }
      case 'match': {
        const match = parseMatchValue(value)
        if (match)
          opt.matches.push(match)
        break
      }
      case 'exclude-match':
      case 'excludeMatch': {
        const match = parseMatchValue(value)
        if (match)
          opt.excludeMatches.push(match)
        break
      }
      case 'exclude-glob':
      case 'excludeGlob': {
        const match = parseMatchValue(value)
        if (match)
          opt.excludeGlobs.push(match)
        break
      }
      case 'include-glob':
      case 'includeGlob': {
        const match = parseMatchValue(value)
        if (match)
          opt.includeGlobs.push(match)
        break
      }
      case 'update-url':
      case 'updateUrl': {
        const updateURL = parseUpdateURLValue(value)
        if (updateURL)
          opt.updateURLs.push(updateURL)
        break
      }
      case 'world': {
        opt.world = checkMetadata(['USER_SCRIPT', 'MAIN'], value)
        break
      }
      case 'run-with':
      case 'runWith': {
        // only esm | raw
        opt.runWith = checkMetadata(['esm', 'raw'], value)
        break
      }
    }
  }

  // 对数组项去重
  for (const item of Object.keys(metaNamesMap)) {
    opt[item] = uniq(opt[item])
  }

  return opt
}

function checkMetadata(rightList, value) {
  return rightList.includes(value) ? value : rightList[0]
}

function parseMatchValue(value) {
  const re2 = /^(?<pattern>\S+)\s*$/
  const matched = value.match(re2)
  if (!matched)
    return null
  const { pattern } = matched.groups
  return pattern
}

function isURLString(text) {
  try {
    // eslint-disable-next-line no-new
    new URL(text)
    return true
  }
  catch {
    return false
  }
}

function parseUpdateURLValue(value) {
  if (isURLString(value)) {
    return value
  }
  else {
    return null
  }
}

function* parseMetadataLines(code) {
  const exp = /^\/\/\s*@(?<key>\S+)(?<value>.+?$|$)/gm
  for (const { groups } of code.matchAll(exp)) {
    const { key, value } = groups

    yield {
      key,
      value: trim(value),
    }
  }
}
