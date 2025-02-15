import request from '@/request'
import { encryptData } from '@/utils/encryption'
import { message } from 'antd'
import { ResponseCode } from '@/enums/responseEnums'

export const getCaptcha = async () => {
  const res = await request.get(
    'api/users/auth/captcha/',
    {},
    {
      headers: {
        token: false
      }
    }
  )
  return Promise.resolve(res.data)
}
export const getWechatQrcode = async () => {
  return await request.get('api/users/auth/wechat/login_qrcode')
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
    .post('api/users/auth/login/', data, {
      headers: {
        token: false
      }
    })
    .then(res => {
      console.log('re：', res)
      if (res && res.code !== ResponseCode.SUCCESS) {
        message.error('登录失败：' + res.msg)
        return res
      }

      if (res && res.data) {
        const { access_token, refresh_token, user_info } = res.data
        localStorage.setItem('token', access_token)
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('user_info', JSON.stringify(user_info))
        message.success('登录成功')
        return res
      }
    })
}
export const getPublicKey = async () => {
  const publicKey = localStorage.getItem('publicKey')
  if (publicKey) {
    return Promise.resolve(publicKey)
  }

  const publicKeyRes = request.get(
    'api/encryption/get-public-key/',
    {},
    {
      headers: {
        token: false
      }
    }
  )

  try {
    const res = await publicKeyRes
    console.log('RES', res)
    localStorage.setItem('publicKey', res.data.public_key)
    return res.data.public_key
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

  return await request.post('api/users/auth/login/sms', data, {
    headers: {
      token: false
    }
  })
}

export const loginWithPhone = async (data: { phone_number: string; verification_code: string }) => {
  data['verification_code'] = await encryptData(data['verification_code'])
  return await request
    .post('api/users/auth/login_with_phone', data, {
      headers: {
        token: false
      }
    })
    .then(res => {
      const { access_token, refresh_token, user_info } = res.data
      if (res && res.user_info) {
        localStorage.setItem('token', access_token)
        localStorage.setItem('access_token', access_token)
        localStorage.setItem('refresh_token', refresh_token)
        localStorage.setItem('user_info', JSON.stringify(user_info))
        message.success('登录成功')
        return Promise.resolve(res)
      }

      message.error('登录失败：' + res)
      return Promise.reject(res)
    })
}
