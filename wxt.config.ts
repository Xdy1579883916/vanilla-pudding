import {defineConfig} from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
    experimental: {
        includeBrowserPolyfill: true,
    },
    runner: {
        disabled: true,
    },
    manifest: {
        name: "香草布丁🌿🍮",
        description: "香草布丁（vanillaJs补丁）是一个用户脚本管理器",
        minimum_chrome_version: "120",
        permissions: [
            "webRequest",
            "activeTab",
            "background",
            "declarativeNetRequest",
            "declarativeNetRequestFeedback",
            "cookies",
            "downloads",
            "storage",
            "unlimitedStorage",
            "userScripts",
        ],
        host_permissions: [
            "<all_urls>"
        ]
    },
    vite: () => ({
        plugins: [
            react()
        ],
    }),
});
