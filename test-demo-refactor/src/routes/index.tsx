import { lazy } from 'react'
import type { RouteObject } from 'react-router-dom'
import { useRoutes } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'

const HomePage = lazy(() => import('@/pages/home'))
const TestCasePage = lazy(() => import('@/pages/testcase'))
const TestPlanPage = lazy(() => import('@/pages/testplan'))
const TestReportPage = lazy(() => import('@/pages/testreport'))
const TagComponentPage = lazy(() => import('@/pages/tag-component'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'testcase', element: <TestCasePage /> },
      { path: 'testplan', element: <TestPlanPage /> },
      { path: 'testreport', element: <TestReportPage /> },
      { path: 'tag-component', element: <TagComponentPage /> },
    ],
  },
]

export const AppRoutes = () => useRoutes(routes)
