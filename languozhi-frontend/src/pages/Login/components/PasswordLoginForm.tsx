import React, { useEffect, useState } from 'react'
import { Input, Button, Form, Typography, Radio, Checkbox } from 'antd'
const { Title, Text } = Typography
import '@/assets/global.css'
import { getCaptcha, loginWithAccount } from '@/services/userAuth'
interface IProps {
  captchaImage: string
  captchaKey: string
  fetchCaptcha: () => void
}
export const PasswordLoginForm: React.FC<IProps> = ({ captchaImage, captchaKey, fetchCaptcha }) => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    console.log('登录信息', values)
    // 这里应该调用验证登录的API
    const res = await loginWithAccount({
      account: values.username,
      password: values.password,
      captcha_key: captchaKey,
      captcha_value: values.captcha
    })
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="username" rules={[{ required: true, message: '请输入手机号/用户名' }]}>
        <Input size="large" placeholder="请输入手机号/用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password size="large" placeholder="请输入密码" />
      </Form.Item>
      {/* 验证码输入框 */}
      <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input size="large" placeholder="请输入验证码" style={{ flex: 1 }} />
          <img
            src={captchaImage} // 验证码图片
            alt="验证码"
            style={{ marginLeft: '10px', cursor: 'pointer', height: '40px' }}
            onClick={fetchCaptcha} // 点击刷新验证码
          />
        </div>
      </Form.Item>
      <Form.Item>
        <div className="block mb-3">
          <a className=" text-left text-sm text-gray-600 link">忘记密码？</a>
        </div>
        <Button className={'btn'} size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Checkbox className="text-gray-600">自动登录</Checkbox>
      </Form.Item>
    </Form>
  )
}
