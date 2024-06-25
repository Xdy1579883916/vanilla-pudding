import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {transformUserScript} from "@vanilla-pudding/vite-plugin";
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const isDev = mode === 'development';
  // 可直接使用网络的ESM的CDN包
  const cdnScripts = {
    // "vue": "https://js-c.etc4.com/pro/js/vue.MCL5DJ5O.js",
    // "naive-ui": "https://js-c.etc4.com/pro/js/naive-ui.4HRUQBDM.js",
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
          name: pkg.name,
          match: "*://**/*",
          allFrames: "true",
        },
        cdnScripts,
      })
    ],
    build: {
      modulePreload: false,
      // minify: "terser",
      // terserOptions: {
      //     compress: {
      //         drop_console: true,
      //         drop_debugger: true,
      //         pure_funcs: ["console.log"],
      //     },
      // },
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
