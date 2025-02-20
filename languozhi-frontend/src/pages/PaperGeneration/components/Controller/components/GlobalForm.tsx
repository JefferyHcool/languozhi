import { Form, Input, Select } from 'antd'
import { FC } from 'react'

const GlobalForm: FC<ControllerProps> = ({ template, updateTemplate }) => {
  const onChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  const onSearch = (value: string) => {
    console.log('search:', value)
  }
  return (
    <div>
      <Form layout={'vertical'}>
        <Form.Item
          className={'font-semibold'}
          label="生成模型"
          name="model"
          tooltip={'如果生成效果不佳建议更换不同模型尝试'}
        >
          <Select
            showSearch
            placeholder="选择生成的模型"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={[
              {
                value: 'DeepSeek-V3',
                label: 'DeepSeek-V3'
              },
              {
                value: 'DeepSeek-V2.5',
                label: 'DeepSeek-V2.5'
              },
              {
                value: 'GPT-4o',
                label: 'GPT-4o'
              },
              {
                value: 'QWEN2.5',
                label: 'QWEN2.5'
              }
            ]}
          />
        </Form.Item>
      </Form>
    </div>
  )
}
export default GlobalForm
