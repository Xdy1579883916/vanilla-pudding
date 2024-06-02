import {defineProxyService} from '@webext-core/proxy-service';
import {BackgroundService} from "@/lib/backgroundService.ts";

export const [registerBackgroundService, getBackgroundService] = defineProxyService(
    'BackgroundService',
    () => new BackgroundService(),
);
