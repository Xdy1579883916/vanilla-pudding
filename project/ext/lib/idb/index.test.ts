import { describe, expect, it } from 'vitest'
import code_test1 from './file/test-1.js?raw'
import code_test2 from './file/test-2.js?raw'
import code_test3 from './file/test-3.js?raw'
import { parseMetadata } from './index.ts'

describe('测试 parseMetadata', () => {
  it('不规范格式的meta容错性', () => {
    const parser = parseMetadata(code_test1)
    expect(parser).toMatchObject({
      allFrames: true,
      excludeGlobs: [],
      excludeMatches: [],
      includeGlobs: [],
      matches: [
        '*://*.edu.ai/*',
        '*://translate.google.com/*',
        '*://translate.google.cn/*',
      ],
      name: 'Google Translate Auto Languages',
      runAt: 'document_end',
      runWith: 'esm',
      updateURLs: [
        'https://update.greasyfork.org/scripts/378166/Google%20Translate%20Auto%20Languages.meta.js',
      ],
      world: 'MAIN',
    })
    // expect(parser).toMatchInlineSnapshot()
  })
  it('意料之外的 meta', () => {
    // 1、意料之外的 meta 虽然被正常解析，但最终会被忽略
    // 2、如果存在重复定义
    //  a: 支持数组的数据会追加
    //  b: 不支持数组的，后定义的 meta 会覆盖上一个
    // 3、忽略掉无效的 meta

    const parser = parseMetadata(code_test2)
    expect(parser).toMatchObject({
      allFrames: true,
      excludeGlobs: [],
      excludeMatches: [],
      includeGlobs: [],
      matches: [
        '*://*.edu.ai/*',
        '*://*.douyin.com/*',
        '*://*.kuaishou.com/*',
        '*://*.ixigua.com/*',
        '*://*.bilibili.com/*',
        '*://*.youtube.com/*',
      ],
      name: '💯 懒人专用系列 ——— 视频下载',
      runAt: 'document_end',
      runWith: 'esm',
      updateURLs: [],
      world: 'MAIN',
    })
    // expect(parser).toMatchInlineSnapshot()
  })
  it('具有一定的防御力', () => {
    const parser = parseMetadata(code_test3)
    expect(parser).toMatchObject({
      allFrames: false,
      excludeGlobs: [],
      excludeMatches: [],
      includeGlobs: [],
      matches: [],
      name: 'new-script',
      runAt: 'document_idle',
      runWith: 'esm',
      updateURLs: [],
      world: 'USER_SCRIPT',
    })
    // expect(parser).toMatchInlineSnapshot()
  })
})
