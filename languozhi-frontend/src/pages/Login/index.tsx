// src/pages/Login/LoginPage.tsx
import React from 'react'
import AuthSplitLayout from '@/layouts/LoginLayouts/AuthSplitLayout'
import LoginForm from '@/pages/Login/components/loginForm'
import bg4 from '@/assets/login_banner4.svg'

const LoginPage: React.FC = () => {
  return (
    <AuthSplitLayout title="欢迎使用蓝果汁" subtitle="您的AI智能英语教学助手" imageUrl={bg4}>
      <LoginForm showLogo={true} />
    </AuthSplitLayout>
  )
}

export default LoginPage
