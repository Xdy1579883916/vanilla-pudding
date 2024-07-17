type StrOrStrArr = string | string[];

interface ScriptMeta {
  "name": string;
  "world"?: chrome.userScripts.ExecutionWorld;
  "runAt"?: chrome.userScripts.RunAt;
  "run-at"?: chrome.userScripts.RunAt;
  "allFrames"?: boolean;
  "all-frames"?: boolean;
  "match"?: StrOrStrArr;
  "exclude-match"?: StrOrStrArr;
  "excludeMatch"?: StrOrStrArr;
  "exclude-glob"?: StrOrStrArr;
  "excludeGlob"?: StrOrStrArr;
  "include-glob"?: StrOrStrArr;
  "includeGlob"?: StrOrStrArr;
  "update-url"?: StrOrStrArr;
  "updateUrl"?: StrOrStrArr;
  // 用户脚本注入的方式, 默认: esm
  "run-with"?: "esm" | "raw";
  "runWith"?: "esm" | "raw";
}

interface Options {
  isDev: boolean,
  cdnScripts: Record<string, string>,
  scriptMeta: ScriptMeta
}

export function transformUserScript({cdnScripts, scriptMeta}: Options) {
  const name = "transformUserScript";
  // 将metaStr计算移到generateBundle外部以优化性能
  let metaStr = generateMetaStr(scriptMeta);

  return {
    name,
    enforce: "post",
    async renderChunk(code: string, meta: { type: string }) {
      if (meta.type === "chunk") {
        // 替换import的相对路径和动态导入
        let newCode = replaceImports(code, cdnScripts);
        return {
          code: newCode,
        };
      }
      return {code};
    },
    async generateBundle(_, bundle) {
      for (const fileName in bundle) {
        const chunk = bundle[fileName];
        // 直接使用预先计算的metaStr
        chunk.code = metaStr + chunk.code;
      }
    },
    closeBundle() {
      console.log(`[Plugin] ${name} -> ending～`);
    },
  };
}

function replaceImports(code: string, cdnScripts: Record<string, string>): string {
  let newCode = code;
  Object.entries(cdnScripts).forEach(([scriptName, cdnURL]) => {
    newCode = newCode.replace(new RegExp(`(import|from)\\s?["'](${scriptName})["'];`, "gi"), `$1 "${cdnURL}";`)
  });
  return newCode;
}

function generateMetaStr(scriptMeta: ScriptMeta): string {
  return Object.entries(scriptMeta).reduce((pre, [k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((item) => {
        pre += `// @${k} ${item}\n`;
      });
    } else {
      pre += `// @${k} ${v}\n`;
    }
    return pre;
  }, "");
}
