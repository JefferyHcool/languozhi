import { RouterRecord } from './index'
import { lazy } from 'react'

const constantRoutes: Array<RouterRecord> = [
  {
    name: '登录',
    path: '/',
    component: lazy(() => import(`@/pages/Login`))
  }
]
export default constantRoutes
