import { FC, useState } from 'react'
import { useTemplateStore } from '@/store/templateStore'
import { QuestionTypeCN } from '@/enums/questionEnums'
import { Button } from 'antd'

const QuestionContainer: FC = () => {
  const numberMap: Record<number, string> = {
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六',
    7: '七',
    8: '八',
    9: '九',
    10: '十'
  }

  const [showButton, setShowButton] = useState<Set<number>>(new Set()) // 使用 Set 存储显示按钮的索引
  const { template } = useTemplateStore()

  const handleMouseEnter = (index: number) => {
    setShowButton(prev => new Set(prev.add(index))) // 鼠标进入时加入该索引
  }

  const handleMouseLeave = (index: number) => {
    setShowButton(prev => {
      const newSet = new Set(prev)
      newSet.delete(index) // 鼠标离开时移除该索引
      return newSet
    })
  }

  return (
    <div className="text-sm space-y-4">
      {template?.questionConfig.type.map((item, index) => (
        <div
          key={item}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          className="min-h-[80px] hover:border-dashed hover:border-2"
        >
          <p className="font-semibold">{`${numberMap[index + 1]}、${QuestionTypeCN[item as keyof typeof QuestionTypeCN] ?? '未知题型'}`}</p>
          <div className={`flex justify-center ${showButton.has(index) ? 'block' : 'hidden'}`}>
            {/* 控制每个索引是否显示按钮 */}
            {showButton.has(index) && <Button>生成题目</Button>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuestionContainer
