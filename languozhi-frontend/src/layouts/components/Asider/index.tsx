import React, { FC, useEffect, useState } from 'react'
import Sider from 'antd/es/layout/Sider'
import { Image, Menu, MenuProps } from 'antd'
import { BookOpen, FileText, FolderOpen, PenTool, Clock, User, Settings } from 'lucide-react'
import styles from './index.module.sass'
import baseRoutes from '@/routes/base'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import AvatarBar from '@/layouts/components/AvatarBar'
import { useMenuStore } from '@/store/menuStore'
import { useLocation, useNavigate } from 'react-router-dom'
import { iconMap } from '@/layouts/components/Asider/iconMap'
import { RouterRecord } from '@/routes'
interface IProps {
  children?: React.ReactNode
  showLogo?: boolean
  isCollapsed?: boolean | undefined
}

const Aside: FC<IProps> = ({ children, showLogo, isCollapsed }) => {
  const collapsed = useMenuStore(state => state.collapsed)
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const onMenuClick = (e: any) => {
    navigate(e.key)
  }

  const generateMenuItems = (routes: RouterRecord[]) => {
    return routes.map(route => {
      if (route.children && route.children.length > 0) {
        return {
          key: route.key,
          label: route.name,
          type: 'group',
          children: route.children.map(child => ({
            key: child.path,
            label: child.name,
            icon: child.icon && iconMap[child.icon] ? React.createElement(iconMap[child.icon]) : null
          }))
        }
      }
      return {
        key: route.path,
        label: route.name,
        icon: route.icon && iconMap[route.icon] ? React.createElement(iconMap[route.icon]) : null
      }
    })
  }
  useEffect(() => {
    // 假设路由 path 与菜单项 key 保持一致
    console.log(location.pathname)
    setSelectedKeys([String(location.pathname).replace('/', '')])
  }, [location.pathname])
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
          onClick={onMenuClick}
          defaultOpenKeys={selectedKeys}
          defaultSelectedKeys={selectedKeys}
          style={{ height: '70%', borderRight: 0, background: 'transparent' }}
          // @ts-ignore
          items={generateMenuItems(baseRoutes)}
        />

        {/* 让 AvatarBar 占据剩余空间 */}
        <div style={{ height: '100%', flex: 1 }}>{/* <AvatarBar layout={'left'} /> */}</div>
      </Sider>
    </div>
  )
}

export default Aside
