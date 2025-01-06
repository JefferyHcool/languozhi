// 将 PEM 格式的公钥转换为 CryptoKey
import { getPublicKey } from '@/services/userAuth'

async function importPublicKey(): Promise<CryptoKey> {
  const pem = await getPublicKey()
  const pemHeader = '-----BEGIN PUBLIC KEY-----'
  const pemFooter = '-----END PUBLIC KEY-----'
  const pemContents = pem.replace(pemHeader, '').replace(pemFooter, '')
  // Base64 解码
  const binaryDerString = atob(pemContents)
  const binaryDer = new Uint8Array(binaryDerString.split('').map(char => char.charCodeAt(0)))

  // 导入公钥
  return crypto.subtle.importKey(
    'spki', // 公钥的类型
    binaryDer.buffer, // 公钥的二进制数据
    {
      name: 'RSA-OAEP', // 加密算法
      hash: 'SHA-256' // 哈希算法
    },
    true, // 是否可以导出密钥
    ['encrypt'] // 密钥用途（加密）
  )
}

// 使用公钥加密数据
async function encryptData(data: string): Promise<string> {
  try {
    const publicKey = await importPublicKey()

    // 将明文数据转换为 ArrayBuffer
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)

    // 使用公钥加密数据
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP'
      },
      publicKey,
      encodedData
    )

    // 将加密后的数据转为 Base64 编码
    return arrayBufferToBase64(encryptedData)
  } catch (err) {
    console.error('加密失败:', err)
    throw new Error('加密失败')
  }
}

// 将 ArrayBuffer 转换为 Base64 字符串
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  // @ts-ignore
  return btoa(String.fromCharCode(...bytes))
}
export { encryptData }
