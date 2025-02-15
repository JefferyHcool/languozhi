import React, { FC, useEffect, useState } from 'react'
import { Image, message, Spin, Typography } from 'antd'
import { getWechatQrcode } from '@/services/userAuth'
import { millisecondsToDHMS, secondsToDHMS } from '@/utils/tools'

const { Title, Text } = Typography

const WeChatLogin: FC = () => {
  const [qrCode, setQrCode] = useState('')
  const [countdown, setCountdown] = useState(0)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)
  const [mask, setMask] = useState(false)
  const [loading, setLoading] = useState(false)

  const getQrCode = async () => {
    const res = await getWechatQrcode()
    if (res && res.code != 0) {
      setMask(false)
      message.error('获取二维码失败')
      return
    }
    if (res && res.data && res.data.expire_seconds) {
      setQrCode(res.data.image_data)
    }
  }

  useEffect(() => {
    getQrCode()
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="text-xl">微信扫码登录</div>
      <Text className="block text-center text-sm text-gray-600 mt-6">微信扫码关注【蓝果汁AI】即可快速登录</Text>
      {/* <Text className="block text-center text-sm text-gray-600 mt-2"> */}
      {/*  二维码有效期 <span className="text-red-600">{secondsToDHMS(countdown, 'minute')}</span> */}
      {/* </Text> */}
      <div className="overflow-hidden" style={{ width: '200px', height: '200px' }}>
        {!qrCode ? (
          <Spin>
            <div style={{ width: '200px', height: '200px' }}></div>
          </Spin>
        ) : (
          <div>
            <Image preview={false} height={200} src={qrCode} />
          </div>
        )}
      </div>
      <Text className="block text-center text-sm text-gray-600 mt-6">
        扫码登录即表示您同意我们的{' '}
        <a href="#" className="text-blue-600 hover:underline">
          用户协议
        </a>{' '}
        和{' '}
        <a href="#" className="text-blue-600 hover:underline">
          隐私政策
        </a>
      </Text>
    </div>
  )
}

export default WeChatLogin
