'use client'

import React, { useEffect, useState } from 'react'
import { Input, Button, Form, message, Radio, Checkbox, Spin } from 'antd'
import { getCaptcha, loginWithAccount, loginWithPhone, sendVerificationCode } from '@/services/userAuth'
interface IProps {
  captchaImage: string
  captchaKey: string
  fetchCaptcha: () => void
}
export const PhoneLoginForm: React.FC<IProps> = ({ captchaImage, captchaKey, fetchCaptcha }) => {
  const [form] = Form.useForm()
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const handleSendCode = async () => {
    try {
      await form.validateFields(['phone', 'captcha'])

      const phone = form.getFieldValue('phone')
      const captcha = form.getFieldValue('captcha')
      // 这里应该调用发送验证码的API
      try {
        const res = await sendVerificationCode({ phone_number: phone, captcha_key: captchaKey, captcha_value: captcha })
        console.log('发送结果', res)
        if (res && res.code === 0) {
          setIsSendingCode(true)
          message.success('验证码发送成功')
          setCountdown(60)
        } else {
          return
        }
      } catch (error) {
        console.log('发送失败', error)
        message.error('发送失败' + error)
        return
      }

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
      // @ts-ignore
      if (error && error.errorFields) {
        // @ts-ignore
        error.errorFields.forEach(field => {
          message.error(field.errors[0])
        })
      } else {
        message.error('请求失败')
      }
    }
  }

  const handleSubmit = async (values: any) => {
    console.log('登录信息', values)
    try {
      await form.validateFields(['phone', 'captcha', 'code'])
      await loginWithPhone({
        phone_number: values.phone,
        verification_code: values.code
      })
    } catch (error) {
      console.log('登录失败', error)
      message.error('请求失败')
    }
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
      <Form.Item name="captcha" rules={[{ required: true, message: '请输入验证码' }]}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Input size="large" placeholder="请输入验证码" style={{ flex: 1 }} />
          {captchaImage ? (
            <img
              src={captchaImage} // 验证码图片
              alt="验证码"
              style={{ marginLeft: '10px', cursor: 'pointer', height: '40px' }}
              onClick={fetchCaptcha} // 点击刷新验证码
            />
          ) : (
            <Spin>
              <div style={{ marginLeft: '10px', cursor: 'pointer', height: '40px' }}></div>
            </Spin>
          )}
        </div>
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
