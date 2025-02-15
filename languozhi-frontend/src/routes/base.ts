import { RouterRecord } from './index'
import { lazy } from 'react'

const baseRoutes: Array<RouterRecord> = [
  {
    key: 'workspace',
    name: '工作台',
    path: 'paper',
    children: [
      {
        key: 'generation',
        name: '试题生成',
        path: 'generation',
        icon: 'PenTool',
        component: lazy(() => import('@/pages/PaperGeneration'))
      },
      {
        key: 'management',
        name: '试卷管理',
        path: 'exam-management',
        icon: 'FileText',
        component: lazy(() => import('@/pages/PaperGeneration'))
      },
      {
        key: 'question',
        name: '题目管理',
        path: 'question-management',
        icon: 'BookOpen'
        // component: lazy(() => import('@/pages/QuestionManagement')),
      },
      {
        key: 'resource',
        name: '资料管理',
        path: 'resource-management',
        icon: 'FolderOpen'
        // component: lazy(() => import('@/pages/ResourceManagement')),
      }
    ]
  },
  {
    key: 'others',
    name: '其他',
    children: [
      {
        key: 'recently-opened',
        name: '最近打开',
        path: '/recently-opened',
        icon: 'Clock'
        // component: lazy(() => import('@/pages/RecentlyOpened')),
      },
      {
        key: 'my-space',
        name: '我的空间',
        path: '/my-space',
        icon: 'User'
        // component: lazy(() => import('@/pages/MySpace')),
      },
      {
        key: 'settings',
        name: '设置',
        path: '/settings',
        icon: 'Settings'
        // component: lazy(() => import('@/pages/Settings')),
      }
    ]
  }
]

export default baseRoutes
