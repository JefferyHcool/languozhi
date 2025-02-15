import { Avatar, Dropdown, MenuProps } from 'antd'
import styles from './index.module.sass'
import { FC } from 'react'
import default_avatar from '@/assets/avatar_m.jpg'
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'

interface IProps {
  layout: string
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: '个人资料',
    icon: <UserOutlined />
  },
  {
    type: 'divider'
  },
  {
    key: '4',
    label: '设置',
    icon: <SettingOutlined />
  },
  {
    key: '2',
    label: '退出登录',
    icon: <LogoutOutlined />
  }
]

const AvatarBar: FC<IProps> = ({ layout }) => {
  return layout === 'top' ? (
    <div className={styles.avatarBarContainer}>
      <Dropdown menu={{ items }}>
        <Avatar size={24} src={default_avatar} />
      </Dropdown>
      <div className={styles.userName}>思诺特</div>
    </div>
  ) : (
    <div className={styles.avatarBarContainerCol}>
      <div className={styles.avatarBar}>
        <Avatar size={'large'} src={default_avatar} />
        <div className={styles.userName}>思诺特</div>
      </div>
      <div className={styles.options}>
        {items?.map(item => {
          if (item && item.type === 'divider') {
            return <div key={item.key} className={styles.divider} />
          }
          return (
            item && (
              <div key={item.key} className={styles.optionItem}>
                {'icon' in item ? item.icon : ''}
                <span>{item.label}</span>
              </div>
            )
          )
        })}
      </div>
    </div>
  )
}

export default AvatarBar
