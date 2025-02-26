import { QuestionTypeCN } from '@/enums/questionEnums'

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

interface GenerationTemplate {
  id: string
  templateName: string
  baseInfo: {
    title: string
  }
  questionConfig: {
    type: string[]
    difficulty: string
  }
  globalConfig: {
    model: string
  }
  questions: IQuestion[] // 保证 questions 总是数组
}

interface IQuestionBase {
  id: string
  classification: string
}

interface IStandardQuestion extends IQuestionBase {
  data: QuestionAttribution
}

interface IListeningQuestion extends IQuestionBase {
  data: ListeningQuestion
}

type IQuestion = IStandardQuestion | IListeningQuestion

interface QuestionAttribution {
  classification: string
  difficulty: string
  count: number
  questions_per_item: number
  extra: string
}

interface Material {
  _format?: string
  scene?: string
  participants?: string | number
  level?: string
  length?: string
  topic?: string
  details?: string
}

interface ListeningQuestion extends QuestionAttribution {
  materials: Material
}
