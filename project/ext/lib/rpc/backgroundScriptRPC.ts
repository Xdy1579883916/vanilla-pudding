import { defineProxyService } from '@webext-core/proxy-service'
import { BackgroundScriptService } from '@/lib/service/backgroundScriptService.ts'

// 背景脚本服务
export const [registerBackgroundScriptService, getBackgroundScriptService] = defineProxyService(
  'BackgroundScriptService',
  () => new BackgroundScriptService(),
)
