<style>
body {
  margin: 0;
}

.monaco-editor .margin-view-overlays div[class*='codicon-folding'] {
  font-size: 80%;
}
</style>

<template>
  <div
    id="monacoEditor"
    ref="monacoEditor"
    style="width: 100vw;height: 100vh; overflow:hidden;"
  />
</template>

<script setup lang="ts">
import codeExample from '@/entrypoints/editor/lib/code.js?raw'
import { getBackgroundScriptService } from '@/lib/rpc/backgroundScriptRPC.ts'
import * as monaco from 'monaco-editor'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import { useMessage } from 'naive-ui'
import { onMounted, ref } from 'vue'

const message = useMessage()
const backgroundScriptService = getBackgroundScriptService()
self.MonacoEnvironment = {
  getWorker() {
    return new TsWorker()
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
    theme: 'vs-dark',
    language: 'javascript',
    folding: true, // 是否折叠
    foldingHighlight: true, // 折叠等高线
    foldingStrategy: 'indentation', // 折叠方式
    showFoldingControls: 'always', // 是否一直显示折叠
    disableLayerHinting: true, // 等宽优化
    emptySelectionClipboard: false, // 空选择剪切板
    selectionClipboard: false, // 选择剪切板
    automaticLayout: true, // 自动布局
    codeLens: false, // 代码镜头
    scrollBeyondLastLine: false, // 滚动完最后一行后再滚动屏幕
    colorDecorators: true, // 颜色装饰器
    accessibilitySupport: 'auto', // 辅助功能支持
    lineNumbers: 'on', // 行号
    lineNumbersMinChars: 5, // 行号最小字符
    readOnly: false, // 是否只读
    maxTokenizationLineLength: 20000000,
    stopRenderingLineAfter: -1,
    fontLigatures: true,
    formatOnType: true,
    autoIndent: 'full',
    cursorBlinking: 'expand',
    dragAndDrop: true,
    mouseWheelZoom: true,
    showUnused: true,
    wordWrap: 'on',
    fontSize: 20,
    tabSize: 2,
    stickyScroll: {
      enabled: false,
    },
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
