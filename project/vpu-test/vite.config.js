import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {transformUserScript} from "@vanilla-pudding/vite-plugin";
import deps from "deyu-deps"

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  const cdnScripts = {
    ...deps,
    // 或许总是应该引入最新的
    "@vanilla-pudding/message": "https://unpkg.com/@vanilla-pudding/message/dist/index.js",
  }

  return {
    server: {
      port: 5177
    },
    plugins: [
      vue(),
      transformUserScript({
        scriptMeta: {
          name: "消息通信测试",
          match: "*://www.baidu.com/*",
          runAt: "document_start",
        },
        cdnScripts,
      })
    ],
    build: {
      modulePreload: false,
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ["console.log"],
        },
      },
      rollupOptions: {
        output: {
          entryFileNames: "[name].js",
          format: "esm",
        },
        external: Object.keys(cdnScripts)
      }
    }
  }
})
