import {esm} from "@/util/esm.js";

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
        csp: "default-src * data: blob: 'unsafe-eval' 'unsafe-inline'"
    });
}

export async function unregisterAllUserScripts() {
    await chrome.userScripts.unregister();
}

export async function registerUserScript({id, matches, code, runAt}) {
    await unregisterUserScript(id);
    await chrome.userScripts.register([{
        id,
        matches,
        js: [
            {
                code: esm(code)
            }
        ],
        runAt: runAt || "document_start"
    }]);
}

export async function unregisterUserScript(id) {
    try {
        await chrome.userScripts.unregister({ids: [id]});
    } catch {
        //
    }
}
