import { FC } from 'react'
import { Layout } from 'antd'
import HeaderComponent from '@/layouts/components/Header'
import styles from './index.module.css'
import Aside from '@/layouts/components/Asider'
import { Outlet } from 'react-router-dom'
import { Content } from 'antd/es/layout/layout'
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
          <Content className={'w-full h-full relative z-50 p-5 pb-2.5 overflow-y-auto'}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}
export default LeftSideLayout
