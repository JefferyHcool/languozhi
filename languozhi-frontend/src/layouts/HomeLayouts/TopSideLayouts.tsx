import { FC } from 'react'
import { Layout } from 'antd'
import HeaderComponent from '@/layouts/components/Header'
import styles from './index.module.css'
import Aside from '@/layouts/components/Asider'
const TopSideLayouts: FC = () => {
  return (
    <>
      <Layout>
        <HeaderComponent />
      </Layout>

      <Layout>
        <Aside></Aside>
      </Layout>
    </>
  )
}
export default TopSideLayouts
