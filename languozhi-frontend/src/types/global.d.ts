declare module '*.css' {
  const classes: { [key: string]: string }
  export default classes
}
declare module 'react-lottie' {
  import { ComponentType } from 'react'

  interface LottieOptions {
    loop?: boolean
    autoplay?: boolean
    animationData?: object
    rendererSettings?: {
      preserveAspectRatio?: string
    }
  }

  const Lottie: ComponentType<{ options: LottieOptions }>

  export default Lottie
}

declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.less' {
  const content: Record<string, string>
  export default content
}
