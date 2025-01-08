import { FC } from 'react'
import { Layout } from 'antd'
import HeaderComponent from '@/layouts/components/Header'
import styles from './index.module.css'
const TopSideLayouts: FC = () => {
  return (
    <Layout>
      <HeaderComponent />
    </Layout>
  )
}
export default TopSideLayouts
