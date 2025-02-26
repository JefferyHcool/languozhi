import { Form, Radio, Tag } from 'antd'
import { FC, useEffect } from 'react'
import { difficultyLevels } from '@/constant'
import { nanoid } from 'nanoid'

const QuestionForm: FC<ControllerProps> = ({ template, updateTemplate }) => {
  const [form] = Form.useForm()

  const questionType = [
    { label: '听力', value: 'listening' },
    { label: '阅读', value: 'reading' },
    { label: '翻译', value: 'translation' },
    { label: '写作', value: 'writing' },
    { label: '完形填空', value: 'cloze' },
    { label: '语法选择题', value: 'grammar' },
    { label: '短文改错', value: 'correct' },
    { label: '补全对话', value: 'completion' }
  ]

  // 题型选择更新
  const handleChange = (tag: string, checked: boolean) => {
    if (!template) return

    updateTemplate({
      questionConfig: {
        ...template.questionConfig,
        type: checked
          ? [...template.questionConfig.type, tag]
          : template.questionConfig.type.filter((t: string) => t !== tag)
      },
      questions: checked
        ? [...template.questions, { id: nanoid(), classification: tag }]
        : template.questions.filter((item: { classification: string }) => item.classification !== tag)
    })
  }

  // 难度等级选择更新
  const handleRadioChange = (e: any) => {
    if (!template) return
    updateTemplate({
      questionConfig: {
        ...template.questionConfig,
        difficulty: e.target.value
      }
    })
  }

  // 初始化表单数据
  useEffect(() => {
    if (template) {
      form.setFieldsValue({ difficulty: template.questionConfig.difficulty || '' })
    }
  }, [template, form])

  return (
    <div>
      <Form layout="vertical" form={form}>
        {/* 题目类型选择 */}
        <Form.Item className="font-semibold" label="题目类型" tooltip="请选择需要生成的题目类型">
          {questionType.map(tag => (
            <Tag.CheckableTag
              className="font-medium text-base my-0.5"
              key={tag.value}
              checked={template?.questionConfig.type.includes(tag.value)}
              onChange={checked => handleChange(tag.value, checked)}
            >
              {tag.label}
            </Tag.CheckableTag>
          ))}
        </Form.Item>

        {/* 题目难度选择 */}
        <Form.Item className="font-semibold" label="总体题目难度" tooltip="每题难度可点击对应属性设置">
          <Radio.Group
            onChange={handleRadioChange}
            className="font-medium"
            options={difficultyLevels}
            value={template?.questionConfig.difficulty}
          />
        </Form.Item>
      </Form>
    </div>
  )
}

export default QuestionForm
