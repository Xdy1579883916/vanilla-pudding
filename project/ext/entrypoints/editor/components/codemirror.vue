<template>
  <div
    id="monacoEditor"
    ref="monacoEditor"
    style="width: 100vw;height: 100vh; overflow:hidden;"
  />
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { onMounted, ref } from 'vue'
import { useMessage } from 'naive-ui'
import { getBackgroundScriptService } from '@/lib/rpc/backgroundScriptRPC.ts'
import codeExample from '@/entrypoints/editor/lib/code.js?raw'

const message = useMessage()
const backgroundScriptService = getBackgroundScriptService()
// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorker() {
    // eslint-disable-next-line new-cap
    return new tsWorker()
  },
}

const url = new URL(location.href)
const id = url.searchParams.get('id')
const match = url.searchParams.get('match')
const monacoEditor = ref(null)

// 挂载
onMounted(async () => {
  if (!id) {
    message.error('脚本加载失败, 无脚本Id')
    return
  }

  // 代码
  let code = codeExample

  if (match) {
    code = codeExample.replace('<all_urls>', match)
  }

  const info = await backgroundScriptService.getUserScript(id)
  // 这是修改脚本
  if (info) {
    code = info.code
  }
  const editor = monaco.editor.create(monacoEditor.value, {
    value: code,
    theme: 'vs-dark', // 主题
    language: 'javascript',
    folding: true, // 是否折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: 'indentation', // 折叠方式  auto | indentation
    showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
    lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
    lineNumbersMinChars: 5, // 行号最小字符   number
    readOnly: false, // 是否只读  取值 true | false
    maxTokenizationLineLength: 20000000,
    stopRenderingLineAfter: -1,
    formatOnPaste: true,
    fontLigatures: true,
    cursorBlinking: 'smooth',
    dragAndDrop: true,
    mouseWheelZoom: true,
    wordWrap: 'on',
    fontSize: 20,
  })
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    message.success('已保存脚本更新~')
    // console.log("editor.value", editor)
    const val = editor.getValue()
    backgroundScriptService.upgradeAndRegisterUserScript(id, val)
  })
})

document.onkeydown = (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') {
    // 阻止默认事件
    e.preventDefault()
  }
}
</script>
