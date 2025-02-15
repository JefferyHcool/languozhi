// @ts-ignore
import Lottie from 'react-lottie'
// @ts-ignore
import animationData from '@/assets/Lottie/banner4.json'
// @ts-ignore
import { FC } from 'react' // 这里是你的动画 JSON 文件

const AnimationBanner: FC = () => {
  const defaultOptions = {
    loop: true, // 是否循环播放
    autoplay: true, // 是否自动播放
    animationData: animationData, // 动画数据
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice' // 保持比例
    }
  }

  return (
    <>
      <Lottie options={defaultOptions} />
    </>
  )
}

// @ts-ignore
export default AnimationBanner
