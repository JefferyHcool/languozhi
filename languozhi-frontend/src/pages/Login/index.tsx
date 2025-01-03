import React, { useState } from 'react'

import { Button, Typography, Tabs, Image, Modal } from 'antd'
import { WechatIcon } from './components/WechatIcon'
import { PhoneLoginForm } from './components/PhoneLoginForm'
import { PasswordLoginForm } from './components/PasswordLoginForm'
import Copyright from '@/components/Copyright'
import WeChatLogin from '@/pages/Login/components/WeChatLogin'

const { Title, Text } = Typography

export default function LoginPage() {
  const [isWechat, setIsWechat] = useState(false)

  return (
    <div className="min-h-screen flex ">
      {/* 左侧插画部分 */}
      <div className="w-1/2 bg-blue-50 hidden lg:flex flex-col justify-center items-center p-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/undraw_online-learning_tgmv-L79t39dqnYDuCUvb2k9gGnRAlGwy4X.svg"
          alt="AI英语助教插画"
          width={500}
          height={500}
          className="mb-8"
          preview={false}
        />
        <Title level={2} style={{ color: '#2563EB', textAlign: 'center', marginBottom: '16px' }}>
          欢迎来到蓝果汁
        </Title>
        <Text style={{ color: '#64748b', fontSize: '18px', textAlign: 'center' }}>您的智能英语教学助手</Text>
      </div>

      {/* 右侧登录表单部分 */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/颜色-8g3wC8tvIEhX3ZRmBGj459sYdfcsjF.png"
              alt="蓝果汁 Logo"
              width={80}
              height={80}
              preview={false}
            />
          </div>
          <Title level={2} style={{ textAlign: 'center', color: '#2563EB', marginBottom: '24px' }}>
            登录到蓝果汁
          </Title>
          <Text className="block text-center text-sm text-gray-600 mb-8">首次登录将自动创建账号</Text>
          <Tabs
            className="h-2/5"
            defaultActiveKey="phone"
            centered
            items={[
              {
                key: 'phone',
                label: '短信验证码登录',
                children: <PhoneLoginForm />
              },
              {
                key: 'password',
                label: '账号密码登录',
                children: <PasswordLoginForm />
              }
            ]}
          />
          <Text className="block text-center text-sm text-gray-600 mt-6">
            登录即表示您同意我们的{' '}
            <a href="#" className="text-blue-600 hover:underline">
              用户协议
            </a>{' '}
            和{' '}
            <a href="#" className="text-blue-600 hover:underline">
              隐私政策
            </a>
          </Text>
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">其他登录方式</span>
            </div>
          </div>
          <Button
            onClick={() => setIsWechat(true)}
            icon={<WechatIcon className="w-5 h-5 mr-2" />}
            style={{ width: '100%', borderColor: '#4CAF50', color: '#4CAF50' }}
          >
            使用微信登录
          </Button>
        </div>
        <div className="absolute bottom-2">
          <Copyright />
        </div>
      </div>
      <Modal
        keyboard
        centered
        closable
        width={400}
        open={isWechat}
        footer={null}
        onCancel={() => setIsWechat(false)}
        onClose={() => setIsWechat(false)}
      >
        <WeChatLogin />
      </Modal>
    </div>
  )
}
