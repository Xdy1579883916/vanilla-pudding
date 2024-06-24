import {esm} from "@/util/esm";

export function isUserScriptsAPIAvailable() {
  try {
    chrome.userScripts
    return true
  } catch {
    return false
  }
}

export async function configureCSP() {
  await chrome.userScripts.configureWorld({
    csp: "default-src * data: blob: 'unsafe-eval' 'unsafe-inline'",
  });
}

export async function unregisterAllUserScripts() {
  await chrome.userScripts.unregister();
}

export async function registerUserScript({id, code, updateURLs, name, enabled, ...other}) {
  await unregisterUserScript(id);
  console.log("info", {id, code, updateURLs, name}, other)

  // 目前支持的配置
  const keys = ['runAt', 'matches', 'excludeMatches', 'excludeGlobs', 'includeGlobs', 'allFrames', 'world']

  const config = keys.reduce((pre, key) => {
    const val = other[key]
    if (val) {
      pre[key] = val;
    }
    return pre
  }, {})

  if (name) {
    await chrome.userScripts.register([{
      ...config,
      id,
      js: [{code: esm(code)}],
    }]);
  }
}

export async function unregisterUserScript(id) {
  try {
    await chrome.userScripts.unregister({ids: [id]});
  } catch {
    //
  }
}
