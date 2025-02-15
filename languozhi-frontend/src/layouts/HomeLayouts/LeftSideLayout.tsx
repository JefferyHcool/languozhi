import { FC } from 'react'
import { Layout } from 'antd'
import HeaderComponent from '@/layouts/components/Header'
import styles from './index.module.css'
import Aside from '@/layouts/components/Asider'
const LeftSideLayout: FC = () => {
  return (
    <>
      {/* <Layout> */}
      {/*  <HeaderComponent /> */}
      {/* </Layout> */}

      <Layout style={{ background: 'transparent' }}>
        <Aside showLogo={true}></Aside>
        <Layout style={{ background: 'transparent' }}>
          <HeaderComponent></HeaderComponent>
        </Layout>
      </Layout>
    </>
  )
}
export default LeftSideLayout
