import { lazy } from 'react'
import constantRoutes from './constant'

export interface RouterRecord {
  name?: string
  path: string
  children?: Array<RouterRecord>
  component: any
  meta?: any
}

const routes: Array<RouterRecord> = [...constantRoutes]
export default routes
