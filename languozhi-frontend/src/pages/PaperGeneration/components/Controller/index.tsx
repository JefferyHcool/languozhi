import React, { FC, useEffect, useState } from 'react'
import { Affix, Button, Collapse, CollapseProps, Radio, Dropdown, MenuProps, message, Modal } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './index.module.css'
import BaseForm from '@/pages/PaperGeneration/components/Controller/components/BaseForm'
import QuestionForm from '@/pages/PaperGeneration/components/Controller/components/QuestionForm'
import GlobalForm from '@/pages/PaperGeneration/components/Controller/components/GlobalForm'
import { useTemplateStore } from '@/store/templateStore'
const index: FC = () => {
  const [modal, contextHolder] = Modal.useModal()

  const { template, createTemplate, updateTemplate, saveTemplate, isExist } = useTemplateStore()
  const [items, setItems] = useState<CollapseProps['items']>()
  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: '保存模板',
      onClick: () => {
        saveTemplate()
        message.success('保存成功')
      }
    },
    {
      key: '2',
      label: '导入模板',
      onClick: () => {
        console.log('导入模板')
      }
    }
  ]
  useEffect(() => {
    if (!template) {
      createTemplate()
    }
    setItems([
      {
        key: '1',
        label: '基本信息',
        children: <BaseForm template={template} updateTemplate={updateTemplate} />
      },
      {
        key: '2',
        label: '题目设置',
        children: <QuestionForm template={template} updateTemplate={updateTemplate} />
      },
      {
        key: '3',
        label: '全局设置',
        children: <GlobalForm template={template} updateTemplate={updateTemplate} />
      }
    ])
  }, [template])
  const handleCreate = () => {
    if (template) {
      if (isExist(template.id)) {
        saveTemplate()
      } else {
        modal.confirm({
          title: '当前模板尚未保持,确定直接创建新模板吗？',
          onOk() {
            createTemplate()
          },
          onCancel() {
            console.log('Cancel')
          }
        })
      }
    }

    createTemplate()
  }
  // 下拉菜单选项

  return (
    <div className={'1280:hidden 1080:w-1/5 2000:w-1/6 px-2.5 relative flex flex-col h-full'}>
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
          {/* 主要操作按钮 */}
          <Button className={'w-full'} type={'primary'}>
            生成试卷
          </Button>
          <Button ghost={true} onClick={handleCreate} className={'w-full'} type={'primary'}>
            新建模板
          </Button>
          {/* 更多操作下拉菜单 */}
          <Dropdown menu={{ items: menuItems }} placement="top">
            <Button className={'w-full'} type={'default'}>
              更多操作 <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Affix>
    </div>
  )
}

export default index
