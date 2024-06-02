import { customAlphabet } from "nanoid"

/**
 * 全局唯一标识符
 * @param {number} len uuid的长度
 * @param {boolean} firstU 将返回的首字母置为"u"
 */
export function guid(len: number = 32, firstU = true) {
  if (firstU) {
    len--
  }
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", len)
  const uuid = nanoid()
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该id不能用作id或者class
  if (firstU) {
    return `u${uuid}`
  }
  else {
    return uuid
  }
}
