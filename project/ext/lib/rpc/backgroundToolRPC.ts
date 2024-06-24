import {BackgroundToolService} from "@/lib/service/backgroundToolService.ts";
import {defineProxyService} from '@webext-core/proxy-service';

// 背景工具服务
export const [registerBackgroundToolService, getBackgroundToolService] = defineProxyService(
    'BackgroundToolService',
    () => new BackgroundToolService(),
);
