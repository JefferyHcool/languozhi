import { RouterRecord } from './index'
import { lazy } from 'react'
import baseRoutes from '@/routes/base'

const constantRoutes: Array<RouterRecord> = [
  {
    name: '登录',
    path: '/login',
    component: lazy(() => import(`@/pages/Login`))
  },
  {
    name: '首页',
    path: '/',
    component: lazy(() => import(`@/pages/Home`)),
    // @ts-ignore
    children: [...baseRoutes[0].children, ...baseRoutes[1].children]
  }
]
export default constantRoutes
