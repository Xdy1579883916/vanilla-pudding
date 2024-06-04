import {Dexie} from 'dexie'
import {guid} from "@/util/guid";
import {isUserScriptsAPIAvailable} from "@/lib/user-script";

class Database extends Dexie {
    constructor() {
        super("Database");
        this.version(1).stores({userScripts: "++id, enabled"});
        this.version(2).stores({userScripts: "id, enabled"}).upgrade(async (tx) => {
            await this.table("userScripts").toCollection().modify((userScript) => {
                userScript.id = guid();
                delete userScript.name;
                delete userScript.urlPatterns;
            });
        });
        this.version(3).stores({userScripts: "id, enabled"}).upgrade(async (tx) => {
            await this.table("userScripts").toCollection().modify((userScript) => {
                userScript.id = guid();
            });
        });
        this.userScripts = this.table("userScripts");
    }
}

export class ScriptDAO {
    constructor() {
        this.db = new Database();
    }

    async getAllUserScripts() {
        const objects = await this.db.userScripts.toArray();
        return objects.map(convertUserScriptObjectToUserScript);
    }

    isSupportAPI() {
        return isUserScriptsAPIAvailable()
    }

    async getAllEnabledUserScripts() {
        const objects = await this.db.userScripts.where("enabled").equals(
            1
            /* True */
        ).toArray();
        return objects.map(convertUserScriptObjectToUserScript);
    }

    async getUserScript(id) {
        const object2 = await this.db.userScripts.get(id);
        if (object2) {
            return convertUserScriptObjectToUserScript(object2);
        } else {
            return null;
        }
    }

    async deleteUserScript(id) {
        await this.db.userScripts.delete(id);
    }

    async updateUserScriptEnabled(id, enabled) {
        await this.db.userScripts.update(id, {
            enabled: enabled ? 1 : 0
            /* False */
        });
    }

    async upsertUserScript(id, code) {
        await this.db.transaction("rw", this.db.userScripts, async () => {
            const object2 = await this.db.userScripts.get(id);
            if (object2) {
                await this.db.userScripts.update(id, {
                    code
                });
            } else {
                await this.db.userScripts.add({
                    id,
                    code,
                    enabled: 1
                    /* True */
                });
            }
        });
    }
}

function convertUserScriptObjectToUserScript(obj) {
    const metadata = parseMetadata(obj.code);
    return {
        id: obj.id,
        code: obj.code,
        enabled: obj.enabled === 1,
        name: metadata.name,
        runAt: metadata.runAt,
        matches: metadata.matches,
        updateURLs: metadata.updateURLs
    };
}

function parseMetadata(code) {
    let name = null;
    let runAt = null;
    const matches = [];
    const updateURLs = [];
    for (const {key, value} of parseMetadataLines(code)) {
        switch (key) {
            case "name": {
                name = value
                break;
            }
            case "runAt": {
                runAt = value
                break;
            }
            case "match": {
                const match = parseMatchValue(value);
                if (match)
                    matches.push(match);
                break;
            }
            case "update-url": {
                const updateURL = parseUpdateURLValue(value);
                if (updateURL)
                    updateURLs.push(updateURL);
                break;
            }
        }
    }

    if (name === null)
        throw new Error("The userscript needs a name.");
    return {
        name,
        matches,
        runAt,
        updateURLs
    };
}

function parseNameValue(value) {
    return value;
}

function parseMatchValue(value) {
    const re2 = /^(?<pattern>\S+)\s*$/;
    const matched = value.match(re2);
    if (!matched)
        return null;
    const {pattern} = matched.groups;
    return pattern;
}

function isURLString(text) {
    try {
        new URL(text);
        return true;
    } catch (_a) {
        return false;
    }
}

function parseUpdateURLValue(value) {
    if (isURLString(value)) {
        return value;
    } else {
        return null;
    }
}

function* parseMetadataLines(code) {
    const exp = /^\/\/ @(?<key>[\w-]+)[\s^\n]+(?<value>.*?)[\s^\n]*$/gm;
    for (const {groups} of code.matchAll(exp)) {
        const {key, value} = groups;
        yield {key, value};
    }
}
