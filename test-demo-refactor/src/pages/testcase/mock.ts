import { createElement } from 'react'
import dayjs from 'dayjs'
import { FileTextOutlined, FolderFilled } from '@ant-design/icons'
import type {
  AutomationRun,
  CasePriority,
  CaseFormValues,
  LibraryTreeNode,
  ProjectStructure,
  TagItem,
  TestCaseRecord,
  TestLevel,
} from './interface'
import type { DataNode } from 'antd/es/tree'

export const PROJECT_DATA: ProjectStructure[] = [
  {
    name: 'E-Commerce Platform',
    components: [
      { name: 'Auth Service', features: ['Login', 'Registration'] },
      { name: 'Shopping Cart', features: ['Add Items', 'Checkout'] },
    ],
  },
  {
    name: 'Payment Gateway',
    components: [
      { name: 'Transaction Engine', features: ['Card Processing', 'Refunds'] },
      { name: 'Risk Management', features: ['Fraud Detection', 'Compliance'] },
    ],
  },
]

export const availableTags: TagItem[] = [
  { id: 't1', name: 'Login', color: 'blue' },
  { id: 't2', name: 'UI', color: 'cyan' },
  { id: 't3', name: 'API', color: 'geekblue' },
  { id: 't4', name: 'Negative', color: 'red' },
  { id: 't5', name: 'Performance', color: 'purple' },
]

export const ownerOptions = ['Alice', 'Bob']

export const libraryTree: LibraryTreeNode[] = PROJECT_DATA.map<DataNode>((project) => ({
  title: project.name,
  key: `project|${project.name}`,
  icon: createElement(FolderFilled),
  children: project.components.map((component) => ({
    title: component.name,
    key: `component|${component.name}`,
    icon: createElement(FolderFilled),
    children: component.features.map((feature) => ({
      title: feature,
      key: `feature|${feature}`,
      icon: createElement(FileTextOutlined),
      isLeaf: true,
    })),
  })),
}))

export const generateMockRuns = (count: number, startDate: string): AutomationRun[] => {
  return Array.from({ length: count }).map((_, index) => {
    const outcome = Math.random()
    const result: AutomationRun['result'] = outcome > 0.2 ? 'Passed' : outcome > 0.1 ? 'Failed' : 'Skipped'
    return {
      id: `run-${index}`,
      time: dayjs(startDate).subtract(index, 'day').subtract(Math.random() * 5, 'hour').format('YYYY-MM-DD HH:mm:ss'),
      result,
      release: `v2.${3 - Math.floor(index / 5)}.${9 - (index % 10)}`,
      duration: `00:0${Math.floor(Math.random() * 5)}:${10 + Math.floor(Math.random() * 50)}`,
    }
  })
}

const generateTagSubset = (index: number) => {
  const start = index % availableTags.length
  const length = Math.floor(Math.random() * 3) + 1
  const subset = availableTags.slice(start, start + length)
  return subset.length ? subset : [availableTags[0]]
}

const pickProjectCombination = (index: number) => {
  const project = PROJECT_DATA[index % PROJECT_DATA.length]
  const component = project.components[Math.floor(index / 2) % project.components.length]
  const feature = component.features[Math.floor(index / 4) % component.features.length]
  return { project: project.name, component: component.name, feature }
}

export const mockTestCases: TestCaseRecord[] = Array.from({ length: 25 }).map((_, index) => {
  const isAuto = index % 3 !== 0
  const { project, component, feature } = pickProjectCombination(index)

  const base: TestCaseRecord = {
    key: `${index}`,
    id: `TC-${1000 + index}`,
    name: `Verify ${feature} functionality ${index + 1}`,
    tags: generateTagSubset(index),
    project,
    component,
    feature,
    owner: index % 2 === 0 ? 'Alice' : 'Bob',
    type: isAuto ? 'auto' : 'manual',
    priority: (`p${index % 4}` as CasePriority),
    testType: index % 5 === 0 ? 'smoke' : index % 2 === 0 ? 'core' : 'extended',
    description: `Verify that the ${feature} works as expected under normal conditions.`,
    steps: '1. Navigate to relevant page\n2. Perform action\n3. Verify result',
    expectedResult: 'Action completed successfully without errors.',
    isRegression: index % 2 === 0,
    createdAt: '2023-11-10 08:21:47',
    updatedAt: '2023-11-15 09:21:51',
  }

  return isAuto
    ? {
      ...base,
      lastRun: generateMockRuns(1, new Date().toISOString())[0],
    }
    : base
})

export const createDefaultCaseValues = (): Partial<CaseFormValues> => ({
  isAutomated: true,
  isRegression: false,
  project: PROJECT_DATA[0].name,
  priority: 'p2',
  testType: 'core',
})

export const projectOptions = PROJECT_DATA.map((project) => ({
  label: project.name,
  value: project.name,
}))

export const componentOptions = PROJECT_DATA.flatMap((project) =>
  project.components.map((component) => ({
    label: component.name,
    value: component.name,
  })),
)

export const featureOptions = PROJECT_DATA.flatMap((project) =>
  project.components.flatMap((component) =>
    component.features.map((feature) => ({
      label: feature,
      value: feature,
    })),
  ),
)

export const priorityOptions = ['p0', 'p1', 'p2', 'p3'].map((value) => ({
  label: value.toUpperCase(),
  value: value as CasePriority,
}))

export const testTypeOptions: { label: string; value: TestLevel }[] = ['smoke', 'core', 'extended'].map((value) => ({
  label: value.toUpperCase(),
  value: value as TestLevel,
}))

