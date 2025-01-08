import axios from 'axios'
import request from '@/request/index'
let promise: Promise<any>
export const refreshToken = async () => {
  if (promise) {
    return promise
  }
  // eslint-disable-next-line no-async-promise-executor
  promise = new Promise(async (resolve, reject) => {
    const res = await request.post(
      'api/auth/refresh/',
      {
        refresh: localStorage.getItem('refresh_token')
      },
      {
        headers: {},
        // @ts-ignore
        isRefreshToken: true
      }
    )
    if (res && res.data) {
      const { access_token, refresh_token } = res.data
      localStorage.setItem('token', access_token)
      localStorage.setItem('access_token', access_token)
      localStorage.setItem('refresh_token', refresh_token)
      resolve(res)
    }
    reject(res)
  })
  promise.finally(() => {
    // @ts-ignore
    promise = null
  })
  return promise
}

export function isRefreshToken(config: { headers: { isRefreshToken: any } }) {
  // @ts-ignore
  return !!config.isRefreshToken
}
