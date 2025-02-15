import { FC } from 'react'
import { QuestionCircleOutlined, SearchOutlined, SunOutlined } from '@ant-design/icons'
import { Space, Tooltip } from 'antd'
// TODO 规范实用工具kit

// 定义工具项的数据结构
interface IToolkit {
  title: string
  icon: React.ReactNode
  onClick: () => void
  description: string
  size?: 'small' | 'middle' | 'large' | number
}

// 创建一个单独的 ToolkitItem 组件来显示每个图标和描述
const ToolkitItem: FC<IToolkit> = ({ title, icon, onClick, description, size = 'middle' }) => {
  // 根据 size 设置图标的 fontSize
  const sizeMap = {
    small: '16px',
    middle: '18px',
    large: '32px'
  }

  const fontSize = typeof size === 'number' ? `${size}px` : sizeMap[size]

  return (
    <div style={{ fontSize }} onClick={onClick}>
      <Tooltip placement="bottom" title={description}>
        {icon}
      </Tooltip>
    </div>
  )
}

const Toolkit: FC = () => {
  // 工具项的数据
  const toolkitData: IToolkit[] = [
    {
      title: 'Search',
      icon: <SearchOutlined />,
      onClick: () => console.log('Search clicked'),
      description: 'Search for something',
      size: 'middle'
    },
    {
      title: 'Question',
      icon: <QuestionCircleOutlined />,
      onClick: () => console.log('Question clicked'),
      description: 'Ask a question',
      size: 'middle'
    },
    {
      title: 'Sun',
      icon: <SunOutlined />,
      onClick: () => console.log('Sun clicked'),
      description: 'Change theme',
      size: 'middle'
    }
  ]

  return (
    <Space size={10}>
      {toolkitData.map((item, index) => (
        <ToolkitItem
          key={index} // 使用索引作为 key
          title={item.title}
          icon={item.icon}
          onClick={item.onClick}
          description={item.description}
          size={item.size}
        />
      ))}
    </Space>
  )
}

export default Toolkit
