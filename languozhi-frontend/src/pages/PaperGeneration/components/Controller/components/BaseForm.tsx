import { Form, Input, InputNumber } from 'antd'

const BaseForm = () => {
  return (
    <div>
      <Form layout={'vertical'}>
        <Form.Item className={'font-semibold'} label="试卷标题" name="title">
          <Input className={'font-medium'} placeholder={'请输入试卷标题'} />
        </Form.Item>
      </Form>
    </div>
  )
}
export default BaseForm
