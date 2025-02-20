import { FC } from 'react'
import PaperContainer from '@/pages/PaperGeneration/components/Generator/components/PaperContainer'

const Generator: FC = () => {
  return (
    <div className={'h-full 1280:w-full 1080:w-4/5 2000:w-5/6 flex justify-center relative '}>
      <div>
        <PaperContainer></PaperContainer>
      </div>
    </div>
  )
}
export default Generator
