import { defineProxyService } from '@webext-core/proxy-service'
import { BackgroundToolService } from '@/lib/service/backgroundToolService.ts'

// 背景工具服务
export const [registerBackgroundToolService, getBackgroundToolService] = defineProxyService(
  'BackgroundToolService',
  () => new BackgroundToolService(),
)
