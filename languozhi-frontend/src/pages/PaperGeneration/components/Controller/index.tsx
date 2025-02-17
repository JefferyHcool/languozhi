import React, { FC } from 'react'
import { Affix, Button, Collapse, CollapseProps, Radio } from 'antd'
import styles from './index.module.css'
import BaseForm from '@/pages/PaperGeneration/components/Controller/components/BaseForm'
import QuestionForm from '@/pages/PaperGeneration/components/Controller/components/QuestionForm'
import GlobalForm from '@/pages/PaperGeneration/components/Controller/components/GlobalForm'
const index: FC = () => {
  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '基本信息',
      children: <BaseForm></BaseForm>
    },
    {
      key: '2',
      label: '题目设置',
      children: <QuestionForm></QuestionForm>
    },
    {
      key: '3',
      label: '全局设置',
      children: <GlobalForm></GlobalForm>
    }
  ]
  return (
    <div className={'1280:hidden 1080:w-1/5 2000:w-1/6  px-2.5  relative flex flex-col h-full'}>
      <div className={'overflow-y-scroll no-scrollbar flex-grow'}>
        <div className={'py-1.5'}>
          <Radio.Group size={'middle'} defaultValue={'paper'}>
            <Radio.Button style={{ background: 'transparent' }} value="paper">
              试卷
            </Radio.Button>
            <Radio.Button style={{ background: 'transparent' }} value="question">
              题目
            </Radio.Button>
          </Radio.Group>
        </div>

        <Collapse className={'font-bold'} ghost items={items} defaultActiveKey={['1', '2']} />
      </div>

      <Affix className={'mt-3.5'} offsetBottom={0}>
        <div
          className={'w-full py-1.5 flex flex-col items-center gap-2 justify-center'}
          style={{ backgroundColor: 'var(--color-background)' }}
        >
          <Button className={'w-full'} type={'primary'}>
            生成试卷
          </Button>
          <Button ghost className={'w-full'} type={'primary'}>
            保存配置
          </Button>
          <Button ghost className={'w-full'} type={'primary'}>
            导入模板
          </Button>
        </div>
      </Affix>
    </div>
  )
}
export default index
