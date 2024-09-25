import { BackgroundScriptService } from '@/lib/service/backgroundScriptService.ts'
import { defineProxyService } from '@webext-core/proxy-service'

// 背景脚本服务
export const [registerBackgroundScriptService, getBackgroundScriptService] = defineProxyService(
  'BackgroundScriptService',
  () => new BackgroundScriptService(),
)
