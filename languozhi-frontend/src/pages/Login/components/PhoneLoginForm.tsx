'use client'

import React, { useState } from 'react'
import { Input, Button, Form, message, Radio, Checkbox } from 'antd'

export const PhoneLoginForm: React.FC = () => {
  const [form] = Form.useForm()
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = async () => {
    try {
      await form.validateFields(['phone'])
      const phone = form.getFieldValue('phone')
      setIsSendingCode(true)
      // 这里应该调用发送验证码的API
      // await sendVerificationCode(phone)
      message.success('验证码已发送')
      setCountdown(60)
      const timer = setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown <= 1) {
            clearInterval(timer)
            setIsSendingCode(false)
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000)
    } catch (error) {
      message.error('请输入有效的手机号码')
    }
  }

  const handleSubmit = async (values: any) => {
    console.log('登录信息', values)
    // 这里应该调用验证登录的API
  }

  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="phone"
        rules={[
          { required: true, message: '请输入手机号码' },
          { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }
        ]}
      >
        <Input size="large" placeholder="请输入手机号码" />
      </Form.Item>
      <Form.Item>
        <Input.Group compact>
          <Form.Item name="code" noStyle rules={[{ required: true, message: '请输入验证码' }]}>
            <Input size="large" style={{ width: 'calc(100% - 120px)' }} placeholder="请输入验证码" />
          </Form.Item>
          <Button size="large" style={{ width: '120px' }} onClick={handleSendCode} disabled={isSendingCode}>
            {isSendingCode ? `${countdown}秒后重试` : '发送验证码'}
          </Button>
        </Input.Group>
      </Form.Item>
      <Form.Item>
        <Button size="large" type="primary" htmlType="submit" style={{ width: '100%' }}>
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Checkbox className=" text-gray-600">自动登录</Checkbox>
      </Form.Item>
    </Form>
  )
}
