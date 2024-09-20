import type { UserConfig } from 'vite'
import type { WxtViteConfig } from 'wxt'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'wxt'

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: [
    '@wxt-dev/i18n/module',
  ],
  imports: {
    addons: {
      vueTemplate: true,
    },
  },
  experimental: {
    includeBrowserPolyfill: true,
  },
  runner: {
    disabled: true,
  },
  manifest: {
    default_locale: 'en',
    name: '__MSG_extName__',
    description: '__MSG_extDescription__',
    minimum_chrome_version: '120',
    permissions: [
      'storage',
      'userScripts',
      'activeTab',
      'background',
      'declarativeNetRequest',
      'declarativeNetRequestFeedback',
      'cookies',
      'downloads',
      'unlimitedStorage',
    ],
    host_permissions: [
      '<all_urls>',
    ],
  },
  vite: ({ mode }) => {
    const isDev = mode === 'development'

    function createMinifyOptions(): any {
      if (!isDev) {
        return {
          minify: 'terser',
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log'],
            },
          },
        }
      }
      return {}
    }

    return {
      plugins: [vue()],
      build: {
        modulePreload: {
          polyfill: false,
        },
        ...createMinifyOptions(),
        target: 'esnext',
        // Enabling sourcemaps with Vue during development is known to cause problems with Vue
        sourcemap: false,
      },
    } as UserConfig as WxtViteConfig
  },
})
