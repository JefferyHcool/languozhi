import { FC, useState } from 'react'
import { Header } from 'antd/es/layout/layout'
import styles from './index.module.sass'
import { Button, Image } from 'antd'
import logo from '@/assets/logo.png'
import { Typography } from 'antd'
import NavBar from '@/layouts/components/NavBar'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { useMenuStore } from '@/store/menuStore'
const { Title } = Typography

interface IProps {
  showLogo?: boolean
}
const HeaderComponent: FC<IProps> = ({ showLogo }) => {
  const collapsed = useMenuStore(state => state.collapsed)
  const toggleMenu = useMenuStore(state => state.toggleMenu)
  return (
    <>
      <Header className={styles.headerContainer}>
        <div className={styles.leftBox}>
          {showLogo && (
            <div className={styles.headerLogo}>
              <Image preview={false} width={32} height={32} src={logo}></Image>
              <span>蓝果汁</span>
            </div>
          )}

          <div className={'flex justify-center gap-2'}>
            <div className={'flex justify-center'} onClick={toggleMenu}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <span className="text-lg font-bold text-zinc-800 whitespace-nowrap">试题生成</span>
          </div>
        </div>

        <div className={styles.rightBox}>
          <NavBar></NavBar>
        </div>
      </Header>
    </>
  )
}
export default HeaderComponent
