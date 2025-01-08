import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'
import { CodeMessage, CodeMessageIF } from '@/request/codeMessage'
import { isRefreshToken, refreshToken } from '@/request/hepler'
import { ResponseCode } from '@/enums/responseEnums'

// 定义响应数据的通用结构
export interface ApiResponse<T = any> extends AxiosResponse<T> {
  code: ResponseCode // 业务状态码
  msg: string // 提示信息
  data: T // 数据类型
}

// 创建 Axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || '/', // 基础请求地址
  timeout: 10000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  }
})

const requestQueue: any[] = []
// 请求拦截器

service.interceptors.request.use(
  // @ts-ignore
  (config: AxiosRequestConfig) => {
    // 在发送请求之前做些什么
    const token = localStorage.getItem('token')

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}` // 在请求头中添加 token
      }
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error('请求错误：', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const res = response.data

    return Promise.resolve(res)
  },
  async error => {
    console.log('error:', error)
    if (error.response?.status === 401) {
      if (error.response?.data?.code === ResponseCode.TOKEN_INVALID && !isRefreshToken(error.config)) {
        const refreshRes = await refreshToken()
        if (refreshRes.code !== ResponseCode.SUCCESS) {
          message.error('登录过期，请重新登录')
          return Promise.reject(error)
        }
        error.config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        return await service.request(error.config)
      }
    }
    // 处理响应错误
    debugger
    if (error.response) {
      const { status, data } = error.response
      // message.error(CodeMessage[status as CodeMessageIF])
    } else {
      console.error('请求失败：', error.message)
    }
    return Promise.reject(error.response)
  }
)

// 封装请求方法
const request = {
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, { params, ...config })
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, { ...config })
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, { ...config })
  },
  delete<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, { params, ...config })
  }
}

export default request
