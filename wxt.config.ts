import {defineConfig} from 'wxt';
import react from '@vitejs/plugin-react';

// See https://wxt.dev/api/config.html
export default defineConfig({
    runner: {
        disabled: true,
    },
    manifest: {
        permissions: [
            "userScripts",
            "storage"
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
