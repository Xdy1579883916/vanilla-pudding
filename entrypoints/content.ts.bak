import {getBackgroundService} from "@/lib/rpc/bg_service.ts";

export default defineContentScript({
  matches: ['<all_urls>'],
  async main() {
    const bs = getBackgroundService()
    const res = await bs.getAllUserScripts()
    console.log('Hello content.', res);
  },
});
