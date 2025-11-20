import { createElement } from 'react'
import { AppstoreOutlined, ContainerOutlined, FileTextOutlined } from '@ant-design/icons'
import type { ExtendedDataNode, PlanCase, RepositoryCase } from './interface'

export const initialPlanHierarchy: ExtendedDataNode[] = [
  {
    title: 'E-Commerce Platform',
    key: 'plan-1',
    icon: createElement(ContainerOutlined),
    description: 'Master test plan for Q4 release. Focus on stability.',
    children: [
      {
        title: 'User Authentication',
        key: 'comp-auth',
        icon: createElement(AppstoreOutlined),
        children: [
          { title: 'Login Flow', key: 'feat-login', icon: createElement(FileTextOutlined), isCritical: true, isDone: false },
          { title: 'Registration', key: 'feat-reg', icon: createElement(FileTextOutlined), isCritical: true, isDone: false },
        ],
      },
    ],
  },
]

export const defaultExpandedKeys = ['plan-1', 'comp-auth']
export const defaultSelectedKey = 'plan-1'

export const componentLibraryOptions = [
  { value: 'User Authentication', label: 'User Authentication' },
  { value: 'Product Catalog', label: 'Product Catalog' },
  { value: 'Shopping Cart', label: 'Shopping Cart' },
  { value: 'Payment Processing', label: 'Payment Processing' },
]

export const generateInitialCases = (): PlanCase[] => [
  {
    key: '1',
    id: 'TC-101',
    title: 'Valid Login',
    planId: 'plan-1',
    componentId: 'comp-auth',
    featureId: 'feat-login',
    type: 'Auto',
    status: 'Passed',
    priority: 'High',
  },
  {
    key: '2',
    id: 'TC-102',
    title: 'Invalid Pass',
    planId: 'plan-1',
    componentId: 'comp-auth',
    featureId: 'feat-login',
    type: 'Auto',
    status: 'Passed',
    priority: 'Medium',
  },
]

export const repositoryCases: RepositoryCase[] = [
  { key: 'rep-1', id: 'TC-901', title: 'Security: SQL Injection', type: 'Auto', status: 'Not Run', priority: 'High' },
  { key: 'rep-2', id: 'TC-902', title: 'Performance: 10k Users', type: 'Auto', status: 'Not Run', priority: 'High' },
  { key: 'rep-3', id: 'TC-903', title: 'UI: Dark Mode Toggle', type: 'Manual', status: 'Not Run', priority: 'Low' },
]

