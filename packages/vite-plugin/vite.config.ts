import {defineConfig} from 'vite'
import { resolve } from "node:path"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    const isDev = mode === 'development';

    return {
        plugins: [
            dts({
                entryRoot: "src",
            }),
        ],
        build: {
            modulePreload: false,
            lib: {
                entry: resolve(__dirname, "src/index.ts"),
                formats: ["es", "cjs"],
                fileName: "index"
            },
            target: "esnext",
            minify: false,
            rollupOptions: {
                external: ['nanoid']
            }
        }
    }
})
