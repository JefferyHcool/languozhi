import { FC, useEffect, useState } from 'react'
import styles from './index.module.css'
import { Alert } from 'antd'
import { useTemplateStore } from '@/store/templateStore'
import QuestionContainer from '@/pages/PaperGeneration/components/Generator/components/questionContainer'

const PaperContainer: FC = () => {
  const [showWarning, setShowWarning] = useState(true)
  const { template } = useTemplateStore()
  const onClose = () => {
    console.log('close')
    setShowWarning(false)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setShowWarning(false)
    }
  }, [])
  return (
    <>
      {showWarning ? (
        <Alert
          className={'mb-2.5'}
          message="目前仅为预览，具体排版请导出优化"
          type="warning"
          closable
          onClose={onClose}
        />
      ) : (
        <></>
      )}

      <div
        className={
          'max-w-[800px]   lg:w-[210mm] mx-auto p-6 shadow-lg rounded bg-white border border-gray-300 overflow-y-scroll ' +
          styles.paperContainer
        }
      >
        {/* 试卷标题 */}
        <div className="text-center text-xl font-bold mb-4">{template?.baseInfo.title}</div>

        {/* 考生信息栏 */}
        {/* <div className="border-b border-gray-400 pb-4 mb-6 text-sm"> */}
        {/*  <div className="grid grid-cols-3 gap-4"> */}
        {/*    <div>姓名：__________</div> */}
        {/*    <div>学号：__________</div> */}
        {/*    <div>班级：__________</div> */}
        {/*  </div> */}
        {/* </div> */}

        {/* 试题区域 */}
        <div>
          <QuestionContainer></QuestionContainer>
        </div>
      </div>
    </>
  )
}

export default PaperContainer
