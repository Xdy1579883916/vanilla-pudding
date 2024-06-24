import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {transformUserScriptPlugin} from "./vite-plugin/transformUserScriptPlugin.js";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const isDev = mode === 'development';
    const cdnScripts = {
        "vue": "https://js-c.etc4.com/pro/js/vue.MCL5DJ5O.js",
        "naive-ui": "https://js-c.etc4.com/pro/js/naive-ui.4HRUQBDM.js",
        "@vanilla-pudding/message": "https://unpkg.com/@vanilla-pudding/message@1.0.0/dist/index.js",
    }

    return {
        server: {
            port: 5177
        },
        plugins: [
            vue(),
            transformUserScriptPlugin({
                isDev,
                scriptMeta: {
                    name: "消息通信测试",
                    match: "*://baidu.com/*",
                    allFrames: "true",
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
