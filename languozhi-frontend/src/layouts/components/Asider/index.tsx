import React, { FC } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Image, Menu, MenuProps } from 'antd'
import { BookOpen, FileText, FolderOpen, PenTool, Clock, User, Settings } from 'lucide-react'
import styles from './index.module.sass'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import AvatarBar from '@/layouts/components/AvatarBar'
import { useMenuStore } from '@/store/menuStore'

interface IProps {
  children?: React.ReactNode
  showLogo?: boolean
  isCollapsed?: boolean | undefined
}

const Aside: FC<IProps> = ({ children, showLogo, isCollapsed }) => {
  const collapsed = useMenuStore(state => state.collapsed)
  const mainNavItems: MenuProps['items'] = [
    {
      key: 'main1',
      type: 'group',
      label: '工作台',
      children: [
        { key: 'sub1', icon: React.createElement(PenTool), label: '试题生成' },
        { key: 'sub2', icon: React.createElement(FileText), label: '试卷管理' },
        { key: 'sub3', icon: React.createElement(BookOpen), label: '题目管理' },
        { key: 'sub4', icon: React.createElement(FolderOpen), label: '资料管理' }
      ]
    },
    {
      key: 'sub1',
      label: '其他',
      type: 'group',
      children: [
        { key: 'sub5', icon: React.createElement(Clock), label: '最近打开' },
        { key: 'sub6', icon: React.createElement(User), label: '我的空间' },
        { key: 'sub7', icon: React.createElement(Settings), label: '设置' }
      ]
    }
  ]

  return (
    <div className="min-h-screen border-r border-gray-200/50  flex flex-col">
      <Sider
        width={200}
        collapsible
        trigger={null}
        collapsed={collapsed}
        className={`${styles.siderContainer} flex flex-col`} // 添加 flex 和 flex-col
      >
        {showLogo ? (
          <div className="flex justify-center items-center gap-2 py-4" style={{ borderRight: 0 }}>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/颜色-8g3wC8tvIEhX3ZRmBGj459sYdfcsjF.png"
              alt="蓝果汁 Logo"
              width={40}
              height={40}
              preview={false}
            />
            {!collapsed ? (
              <span className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>
                蓝果汁
              </span>
            ) : (
              <div></div>
            )}
          </div>
        ) : (
          <div></div>
        )}

        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '70%', borderRight: 0, background: 'transparent' }}
          items={mainNavItems}
        />

        {/* 让 AvatarBar 占据剩余空间 */}
        <div style={{ height: '100%', flex: 1 }}>{/* <AvatarBar layout={'left'} /> */}</div>
      </Sider>
    </div>
  )
}

export default Aside
