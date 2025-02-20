import { Form, Input, InputNumber } from 'antd'
import { FC, useEffect } from 'react'
const BaseForm: FC<ControllerProps> = ({ template, updateTemplate }) => {
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({ title: template?.baseInfo?.title || '' })
  }, [template, form])
  return (
    <div>
      <Form
        form={form}
        layout={'vertical'}
        onValuesChange={changedValues => {
          // @ts-ignore
          updateTemplate({ baseInfo: { ...template.baseInfo, ...changedValues } })
        }}
      >
        <Form.Item className={'font-semibold'} label="试卷标题" name="title">
          <Input className={'font-medium'} placeholder={'请输入试卷标题'} />
        </Form.Item>
      </Form>
    </div>
  )
}
export default BaseForm
