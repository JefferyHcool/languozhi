import React from 'react'
import { Input, Button, Form, Typography, Radio, Checkbox } from 'antd'
const { Title, Text } = Typography
import '@/assets/global.css'
export const PasswordLoginForm: React.FC = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: any) => {
    console.log('登录信息', values)
    // 这里应该调用验证登录的API
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item name="username" rules={[{ required: true, message: '请输入手机号/用户名' }]}>
        <Input size="large" placeholder="请输入手机号/用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password size="large" placeholder="请输入密码" />
      </Form.Item>
      <Form.Item>
        <div className="block mb-3">
          <a className=" text-left  text-sm text-gray-600 link">忘记密码？</a>
        </div>
        <Button className={'btn'} size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Checkbox className=" text-gray-600">自动登录</Checkbox>
      </Form.Item>
    </Form>
  )
}
