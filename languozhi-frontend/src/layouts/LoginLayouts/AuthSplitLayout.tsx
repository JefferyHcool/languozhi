// src/layouts/AuthSplitLayout.jsx
import React, { FC } from 'react'
import { Typography, Image } from 'antd'
import Copyright from '@/components/Copyright'
import './index.css'
const { Title, Text } = Typography

interface IProps {
  children: React.ReactNode // 子组件
  title?: string // 左侧标题
  subtitle?: string // 左侧副标题
  slogan?: string
  imageUrl?: string // 左侧插图的 URL
}
// TODO: 优化代码中的颜色 改为使用全局css变量
const AuthSplitLayout: FC<IProps> = ({ children, title, subtitle, slogan, imageUrl }) => {
  return (
    <div className="min-h-screen relative flex" id="container">
      {/* 左侧插画部分 */}
      <div className="w-3/4 hidden lg:flex flex-col justify-center items-center p-12">
        <div className="block w-full flex flex-col justify-items-start">
          <div className="flex items-center mb-4">
            <Text className="font-bold text-2xl" style={{ color: '#2563EB' }}>
              {title || '欢迎'}
            </Text>
          </div>

          <Title level={2} style={{ color: '#2563EB' }}>
            {subtitle || '一款面向教师、教育机构，专注于英语试卷出题与管理的AI智能化平台'}
          </Title>
          <Text className="text-lg" style={{ color: '#64748b' }}>
            {slogan || '一款面向教师、教育机构，专注于英语试卷出题与管理的AI智能化平台'}
          </Text>
        </div>
        <div className="backdrop-blur-xl rounded-2xl bg-opacity-20">
          <Image
            src={imageUrl || 'https://via.placeholder.com/800'}
            alt="插图"
            width={800}
            height={800}
            className="mb-8"
            preview={false}
          />
        </div>
      </div>

      {/* 右侧表单部分 */}
      <div className="w-1/4 lg:w-1/2 flex items-center justify-center p-8 relative">{children}</div>
      <div className="w-full block absolute flex justify-center bottom-2">
        <Copyright />
      </div>
    </div>
  )
}

export default AuthSplitLayout
