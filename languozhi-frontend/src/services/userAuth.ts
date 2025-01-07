import request from '@/request'
import { encryptData } from '@/utils/encryption'
import { message } from 'antd'

export const getCaptcha = async () => {
  return await request.get('api/users/auth/captcha/')
}

export const loginWithAccount = async (data: {
  account: string
  password: string
  captcha_key: string
  captcha_value: string
}) => {
  data['password'] = await encryptData(data['password'])
  data['captcha_value'] = await encryptData(data['captcha_value'])

  request
    .post('api/users/auth/login/', data)
    .then(res => {
      console.log('re：', res)
      if (res && res.user_info) {
        localStorage.setItem('token', res.access_token)
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('refresh_token', res.refresh_token)
        localStorage.setItem('user_info', JSON.stringify(res.user_info))
        message.success('登录成功')
        return Promise.resolve(res)
      }

      message.error('登录失败：' + res)
    })
    .catch(err => {
      console.error('登录失败：', err)
      console.log('err', err)
      message.error('登录失败：' + err)
      return Promise.reject(err)
    })
}
export const getPublicKey = async () => {
  const publicKey = localStorage.getItem('publicKey')
  if (publicKey) {
    return Promise.resolve(publicKey)
  }

  const publicKeyRes = request.get('api/encryption/get-public-key/')

  try {
    const res = await publicKeyRes
    console.log('RES', res)
    localStorage.setItem('publicKey', res.public_key)
    return res.public_key
  } catch (err) {
    console.error('获取公钥失败：', err)
  }
}

export const sendVerificationCode = async (data: {
  phone_number: string
  captcha_key: string
  captcha_value: string
}) => {
  data['captcha_value'] = await encryptData(data['captcha_value'])

  return await request.post('api/users/auth/login/sms', data)
}

export const loginWithPhone = async (data: { phone_number: string; verification_code: string }) => {
  data['verification_code'] = await encryptData(data['verification_code'])
  return await request.post('api/users/auth/login_with_phone', data).then(res => {
    if (res && res.user_info) {
      localStorage.setItem('token', res.access_token)
      localStorage.setItem('access_token', res.access_token)
      localStorage.setItem('refresh_token', res.refresh_token)
      localStorage.setItem('user_info', JSON.stringify(res.user_info))
      message.success('登录成功')
      return Promise.resolve(res)
    }

    message.error('登录失败：' + res)
    return Promise.reject(res)
  })
}
