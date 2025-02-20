import { Form, Input } from 'antd'
import { FC, useEffect } from 'react'

const BaseForm: FC<ControllerProps> = ({ template, updateTemplate }) => {
  const [form] = Form.useForm()

  // 只依赖 template，避免不必要的 re-render
  useEffect(() => {
    form.setFieldsValue({
      title: template?.baseInfo?.title || '',
      templateName: template?.templateName || ''
    })
  }, [template])

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(changedValues, allValues) => {
          updateTemplate({
            ...allValues,
            baseInfo: { ...template?.baseInfo, title: allValues.title }
          })
        }}
      >
        <Form.Item className="font-semibold" label="模板名称" name="templateName">
          <Input className="font-medium" placeholder="请输入模板名称" />
        </Form.Item>
        <Form.Item className="font-semibold" label="试卷标题" name="title">
          <Input className="font-medium" placeholder="请输入试卷标题" />
        </Form.Item>
      </Form>
    </div>
  )
}

export default BaseForm
