import { Form, Input, Radio, Tag, Tooltip } from 'antd'
import { FC, useEffect, useState } from 'react'

const questionForm: FC<ControllerProps> = ({ template, updateTemplate }) => {
  const questionType = [
    {
      label: '听力',
      value: 'listening'
    },
    {
      label: '阅读',
      value: 'reading'
    },
    {
      label: '翻译',
      value: 'translation'
    },
    {
      label: '写作',
      value: 'writing'
    },
    {
      label: '完形填空',
      value: 'cloze'
    },
    {
      label: '语法选择题',
      value: 'grammar'
    },
    {
      label: '短文改成',
      value: 'correct'
    },
    {
      label: '补全对话',
      value: 'completion'
    }
  ]
  const difficultyLevels = [
    { label: '小学', value: 'elementary' },
    { label: '初中', value: 'middle_school' },
    { label: '高中', value: 'high_school' },
    { label: '大学', value: 'university' },
    { label: 'CET4', value: 'cet4' },
    { label: 'CET6', value: 'cet6' },
    { label: 'IELTS', value: 'ielts' },
    { label: 'TOEFL', value: 'toefl' },
    { label: 'GRE', value: 'gre' },
    { label: 'GMAT', value: 'gmat' },
    { label: 'A1', value: 'a1' },
    { label: 'A2', value: 'a2' },
    { label: 'B1', value: 'b1' },
    { label: 'B2', value: 'b2' },
    { label: 'C1', value: 'c1' },
    { label: 'C2', value: 'c2' }
  ]
  const [form] = Form.useForm()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag)
    if (template) {
      updateTemplate({
        questionConfig: {
          type: nextSelectedTags,
          difficulty: template.questionConfig.difficulty
        }
      })
    }

    setSelectedTags(nextSelectedTags)
  }
  const handleRadioChange = (item: any) => {
    console.log(item.target.value)
    if (template) {
      updateTemplate({
        questionConfig: {
          type: template.questionConfig.type,
          difficulty: item.target.value
        }
      })
    }
  }
  useEffect(() => {
    if (template) {
      setSelectedTags(template.questionConfig.type || []) // ✅ 直接更新 state
      form.setFieldsValue({ difficulty: template?.questionConfig.difficulty || '' })
    }
  }, [template])

  return (
    <div>
      <Form layout={'vertical'} form={form}>
        <Form.Item className={'font-semibold'} label="题目类型" name="title" tooltip={'请选择需要生成的题目类型'}>
          {questionType.map<React.ReactNode>(tag => (
            <Tag.CheckableTag
              className={'font-medium text-base my-0.5 '}
              key={tag.value}
              checked={selectedTags.includes(tag.value)}
              onChange={checked => handleChange(tag.value, checked)}
            >
              {tag.label}
            </Tag.CheckableTag>
          ))}
        </Form.Item>
        <Form.Item
          className={'font-semibold'}
          label="总体题目难度"
          name="difficulty"
          tooltip={'每题难度可点击对应属性设置'}
        >
          <Radio.Group
            onChange={item => handleRadioChange(item)}
            className={'font-medium'}
            options={difficultyLevels}
          ></Radio.Group>
        </Form.Item>
      </Form>
    </div>
  )
}
export default questionForm
