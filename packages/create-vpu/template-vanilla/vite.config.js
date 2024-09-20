import { transformUserScript } from '@vanilla-pudding/vite-plugin'
import { defineConfig } from 'vite'
import pkg from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-unused-vars
  const isDev = mode === 'development'
  // 可直接使用网络的ESM的CDN包
  const cdnScripts = {
    '@vanilla-pudding/message': 'https://unpkg.com/@vanilla-pudding/message/dist/index.js',
  }

  return {
    server: {
      port: 5177,
    },
    plugins: [
      transformUserScript({
        scriptMeta: {
          name: pkg.name,
          match: '*://www.baidu.com/*',
        },
        cdnScripts,
      }),
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
          entryFileNames: '[name].js',
          format: 'esm',
        },
        external: Object.keys(cdnScripts),
      },
    },
  }
})
