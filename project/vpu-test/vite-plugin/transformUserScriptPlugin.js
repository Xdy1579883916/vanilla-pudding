export function transformUserScriptPlugin({isDev, cdnScripts, scriptMeta}) {
    const name = "transformUserScript"

    return {
        name,
        enforce: "post",
        async renderChunk(code, meta) {
            if (meta.type === "chunk") {
                let newCode = code
                // 替换import的相对路径
                // newCode = newCode.replace(/["'].(\/\S+.js)["']/gi, `"${domain}$1"`);
                // 部分包替换为CDN引用
                Object.entries(cdnScripts).forEach(([scriptName, cdnURL]) => {
                    newCode = newCode.replace(new RegExp(`(import|from)\\s?["'](${scriptName})["'];`, "gi"), `$1 "${cdnURL}";`)
                })
                return {
                    code: newCode,
                }
            }
            return {code}
        },
        async generateBundle(_, bundle) {
            for (const fileName in bundle) {
                const chunk = bundle[fileName]

                // @name 工时计算
                // @match *://alidocs.dingtalk.com/iframe/*
                // @allFrames true
                const metaStr = Object.entries(scriptMeta).reduce((pre, [k, v]) => {
                    pre += `// @${k} ${v}\n`
                    return pre
                }, "")

                chunk.code = metaStr + chunk.code
            }
        },
        closeBundle() {
            console.log(`[Plugin] ${name} -> ending～`)
        },
    }
}
