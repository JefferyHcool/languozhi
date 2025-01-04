import { Button, Image, Modal, Radio, Tabs, Typography } from 'antd'
import { PhoneLoginForm } from '@/pages/Login/components/PhoneLoginForm'
import { PasswordLoginForm } from '@/pages/Login/components/PasswordLoginForm'
import { WechatIcon } from '@/pages/Login/components/WechatIcon'
import Copyright from '@/components/Copyright'
import React, { FC, useState } from 'react'
import WeChatLogin from '@/pages/Login/components/WeChatLogin'
const { Title, Text } = Typography
interface IProps {
  showLogo?: boolean
}
const LoginForm: FC<IProps> = ({ showLogo }) => {
  const [isWechat, setIsWechat] = useState(false)

  return (
    <>
      <div className="w-full max-w-md shadow-lg bg-white p-10 rounded-xl">
        <div className="flex justify-center mb-8">
          {showLogo ? (
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/颜色-8g3wC8tvIEhX3ZRmBGj459sYdfcsjF.png"
              alt="蓝果汁 Logo"
              width={80}
              height={80}
              preview={false}
            />
          ) : (
            ''
          )}
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
              children: (
                <div style={{ minHeight: '230px' }}>
                  <PhoneLoginForm />
                </div>
              )
            },
            {
              key: 'password',
              label: '账号密码登录',
              children: (
                <div style={{ minHeight: '230px' }}>
                  {' '}
                  <PasswordLoginForm />{' '}
                </div>
              )
            }
          ]}
        />
        {/* <Text className="block text-center text-sm  "></Text> */}

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
        <Text className="block text-center text-sm text-gray-600 mt-2.5 ">
          登录即表示您同意我们的{' '}
          <a href="#" className="text-blue-600 hover:underline">
            用户协议
          </a>{' '}
          和{' '}
          <a href="#" className="text-blue-600 hover:underline">
            隐私政策
          </a>
        </Text>
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
    </>
  )
}
export default LoginForm
