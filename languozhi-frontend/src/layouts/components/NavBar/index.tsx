import { FC } from 'react'
import styles from './index.module.sass'
import AvatarBar from '@/layouts/components/AvatarBar'
import Toolkit from '@/layouts/components/Toolkit'
const NavBar: FC = () => {
  return (
    <div className={styles.navBarContainer}>
      <Toolkit></Toolkit>
      <AvatarBar layout={'top'}></AvatarBar>
    </div>
  )
}
export default NavBar
