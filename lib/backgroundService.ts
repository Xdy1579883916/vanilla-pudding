// @ts-nocheck
import {ScriptDAO} from "@/lib/idb";
import {registerUserScript, unregisterUserScript} from "@/lib/user-script";
import {guid} from "@/util/guid";

export class BackgroundService extends ScriptDAO {
    constructor() {
        super()
    }

    generateUserScriptId() {
        return guid()
    };

    async getUserScriptList() {
        const userScripts = await this.getAllUserScripts();
        return userScripts.map((x) => ({
            id: x.id,
            enabled: x.enabled,
            name: x.name,
            matches: x.matches,
            updateURLs: x.updateURLs
        }));
    }

    async setUserScriptEnabled(id, enabled) {
        await this.updateUserScriptEnabled(id, enabled);
        if (enabled) {
            const userScript = await this.getUserScript(id);
            if (userScript) {
                await registerUserScript(userScript);
            }
        } else {
            await unregisterUserScript(id);
        }
        return null;
    }

    async removeUserScript(id) {
        await this.deleteUserScript(id);
        await unregisterUserScript(id);
        return null;
    }

    async removeAllUserScript() {
        const userScripts = await this.getAllUserScripts();
        for (const userScript of userScripts) {
            await this.removeUserScript(userScript.id)
        }
        return null;
    }

    async setUserScript(id, code) {
        await this.upsertUserScript(id, code);
        const userScript = await this.getUserScript(id);
        if (userScript == null ? void 0 : userScript.enabled) {
            await registerUserScript(userScript);
        }
        return null;
    }

    async upgradeAndRegisterUserScript(id, code) {
        await this.upsertUserScript(id, code)
        const userScript = await this.getUserScript(id);
        if (userScript) {
            await registerUserScript(userScript);
            return true;
        }
        return false;
    }

    async upgradeUserScriptToLatest(id) {
        const userScript = await this.getUserScript(id);
        if (userScript) {
            for (const updateURL of userScript.updateURLs) {
                try {
                    const code = await fetch(updateURL).then(res => res.text());
                    await this.setUserScript(id, code);
                    return true;
                } catch {
                    //
                }
            }
        }
        return false;
    }
}

