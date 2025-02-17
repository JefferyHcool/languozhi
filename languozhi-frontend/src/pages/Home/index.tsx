import { FC } from 'react'
import TopSideLayouts from '@/layouts/HomeLayouts/TopSideLayouts'
import LeftSideLayout from '@/layouts/HomeLayouts/LeftSideLayout'
import bg1 from '@/assets/bg.png'
import styles from './index.module.css'
const HomePage: FC = () => {
  return (
    <div className=" relative">
      <div className={'absolute inset-0 ' + styles.homeContainer}></div>
      <div className={'absolute inset-0 ' + styles.backBottom}></div>

      <LeftSideLayout></LeftSideLayout>
      {/* <TopSideLayouts /> */}
    </div>
  )
}
export default HomePage
