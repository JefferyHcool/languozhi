import { RouterRecord } from './index'
import { lazy } from 'react'

const constantRoutes: Array<RouterRecord> = [
  {
    name: '登录',
    path: '/login',
    component: lazy(() => import(`@/pages/Login`))
  },
  {
    name: '首页',
    path: '/',
    component: lazy(() => import(`@/pages/Home`))
  }
]
export default constantRoutes
