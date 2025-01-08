import { FC } from 'react'
import { Header } from 'antd/es/layout/layout'
import styles from './index.module.less'
import { Image } from 'antd'
import logo from '@/assets/logo.png'
import { Typography } from 'antd'
const { Title } = Typography
const HeaderComponent: FC = () => {
  return (
    <>
      <Header className={styles.headerContainer}>
        <div className={styles.headerLogo}>
          <Image preview={false} width={32} height={32} src={logo}></Image>
          <span>蓝果汁</span>
        </div>
      </Header>
    </>
  )
}
export default HeaderComponent
