import React, { FC } from 'react'
const Copyright: FC = () => {
  const dates = 2025
  const author = '蓝果汁'

  return <div className="text-sm  text-gray-400	"> Copyright © {dates + ' ' + author}</div>
}
export default Copyright
