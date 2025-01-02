import React from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import { antdTheme } from './themes/global'

function App() {
  return <ConfigProvider theme={antdTheme}></ConfigProvider>
}

export default App
