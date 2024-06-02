export class SessionStorage {
    async getItem(key) {
        const result = await chrome.storage.session.get(key);
        return result[key];
    }
    async setItem(key, value) {
        await chrome.storage.session.set({ [key]: value });
    }
    async removeItem(key) {
        await chrome.storage.session.remove(key);
    }
    async clear() {
        await chrome.storage.session.clear();
    }
}
