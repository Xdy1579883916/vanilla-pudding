import {defineProxyService} from '@webext-core/proxy-service';

// 1. Define your service
class MathService {
    async add(a: number, b: number): Promise<number> {
        return a + b
    }
}

export const [registerMathService, getMathService] = defineProxyService(
    'MathService',
    () => new MathService(),
);
