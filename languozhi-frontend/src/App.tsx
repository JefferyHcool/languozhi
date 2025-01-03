import React, { Suspense } from 'react'
import './App.css'
import { ConfigProvider } from 'antd'
import { antdTheme } from './themes/global'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import routes, { RouterRecord } from '@/routes'
const renderRoutes = (routes: RouterRecord[]) =>
  routes.map((route, index) => (
    <Route key={index} path={route.path} element={<route.component />}>
      {route.children && renderRoutes(route.children)}
    </Route>
  ))
function App() {
  return (
    <ConfigProvider theme={antdTheme}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>{renderRoutes(routes)}</Routes>
        </Router>
      </Suspense>
    </ConfigProvider>
  )
}

export default App
