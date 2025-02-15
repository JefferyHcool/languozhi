import { lazy } from 'react'
import constantRoutes from './constant'

export interface RouterRecord {
  key?: string
  name?: string
  path?: string
  children?: Array<RouterRecord>
  component?: any
  meta?: any
  icon?: string
}

const routes: Array<RouterRecord> = [...constantRoutes]
export default routes
