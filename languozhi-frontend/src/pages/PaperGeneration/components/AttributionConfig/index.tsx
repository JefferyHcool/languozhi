import { FC, useEffect } from 'react'
import { Collapse, Form, Input, InputNumber, Radio } from 'antd'
import { difficultyLevels, materialsFormat } from '@/constant'
import TextArea from 'antd/es/input/TextArea'
import { useAttributionStore } from '@/store/attributionStore'
import { QuestionTypeCN } from '@/enums/questionEnums'
import { useTemplateStore } from '@/store/templateStore'

const { Panel } = Collapse

const AttributionConfig: FC = () => {
  const [form] = Form.useForm()
  const { currentItem } = useAttributionStore()
  const template = useTemplateStore(state => state.template)
  const updateTemplate = useTemplateStore(state => state.updateTemplate)

  // 监听 count 变化
  const count = Form.useWatch('count', form) || 1 // 默认至少 1 题
  const handleChange = () => {
    const val = form.getFieldsValue()

    if (!template) return

    // 更新 questions 数组
    const updatedQuestions = template.questions.map(item => {
      if (item.classification === currentItem) {
        return {
          ...item,
          data: val
        }
      }
      return item
    })

    // 更新 template
    updateTemplate({
      ...template,
      questions: updatedQuestions
    })
  }

  useEffect(() => {
    form.setFieldValue('classification', QuestionTypeCN[currentItem as keyof typeof QuestionTypeCN])
    if (template) {
      const currentQuestion = template.questions.find(item => {
        return item.classification == currentItem
      })
      form.setFieldsValue({
        ...currentQuestion?.data
      })
    }
  }, [currentItem, template])

  return (
    <div>
      <Form
        onChange={values => {
          handleChange()
        }}
        form={form}
        layout="vertical"
      >
        <Form.Item className="font-semibold" name="classification" label="题目类型">
          <Input className="font-medium" disabled />
        </Form.Item>
        <Form.Item className="font-semibold" name="difficulty" label="题目难度">
          <Radio.Group
            className="font-medium"
            defaultValue={template?.questionConfig.difficulty}
            options={difficultyLevels}
          />
        </Form.Item>

        <Form.Item className="font-semibold" name="count" label="大题数量">
          <InputNumber min={1} max={10} defaultValue={1} />
        </Form.Item>

        <Form.Item className="font-semibold" name="questions_per_item" label="小题数量" tooltip="每个大题的小题数量">
          <InputNumber min={1} max={10} />
        </Form.Item>

        <Form.Item
          className="font-semibold"
          label="题目备注"
          name="extra"
          tooltip="提示：可以自由的设置题目的一些信息，如是否出现某个单词等"
        >
          <TextArea rows={2} placeholder={'eg:题目中必须出现四级常用单词'} />
        </Form.Item>

        {/* 听力题目时，动态渲染 Collapse */}
        {QuestionTypeCN[currentItem as keyof typeof QuestionTypeCN] === QuestionTypeCN.listening && (
          <Collapse defaultActiveKey={['0']} accordion>
            {Array.from({ length: count }).map((_, index) => (
              <Panel key={index} header={`题目 ${index + 1}`}>
                <Form.Item
                  className="font-semibold"
                  tooltip="提示：若不选择默认是对话形式"
                  label="素材形式"
                  name={['materials', index, '_format']}
                >
                  <Radio.Group className="font-medium" options={materialsFormat} />
                </Form.Item>
                <Form.Item
                  className="font-semibold"
                  tooltip="提示：对话的主题，比如如何应对AI焦虑"
                  label="对话主题"
                  name={['materials', index, 'topic']}
                >
                  <Input className="font-medium" placeholder="请输入对话主题" />
                </Form.Item>
                <Form.Item
                  className="font-semibold"
                  tooltip="提示：素材场景，不选择AI自动生成"
                  label="素材场景"
                  name={['materials', index, 'scene']}
                >
                  <Input className="font-medium" placeholder="请输入素材场景" />
                </Form.Item>

                <Form.Item
                  className="font-semibold"
                  tooltip="提示：参与对话的人数，不选择AI自动生成"
                  label="对话人数"
                  name={['materials', index, 'participants']}
                >
                  <Input className="font-medium" placeholder="请输入对话的人数" />
                </Form.Item>
                <Form.Item
                  className="font-semibold"
                  tooltip="提示：这里可自由语义化的设置 比如小学三年级，不填写默认使用总体难度"
                  label="素材难度"
                  name={['materials', index, 'level']}
                >
                  <Input className="font-medium" placeholder="请输入素材的难度" />
                </Form.Item>
                <Form.Item
                  className="font-semibold"
                  tooltip="提示：这里可自由语义化的设置对话长度，如不低于20论对话，不设置则AI自动生成"
                  label="素材长度"
                  name={['materials', index, 'length']}
                >
                  <Input className="font-medium" placeholder="请输入素材的长度" />
                </Form.Item>
                <Form.Item
                  className="font-semibold"
                  tooltip="提示：这里可自由语义化的设置一些对话细节，比如必须出现某个单词或事件等"
                  label="素材备注"
                  name={['materials', index, 'details']}
                >
                  <TextArea className="font-medium" placeholder="请输入素材的备注" />
                </Form.Item>
              </Panel>
            ))}
          </Collapse>
        )}
      </Form>
    </div>
  )
}

export default AttributionConfig
