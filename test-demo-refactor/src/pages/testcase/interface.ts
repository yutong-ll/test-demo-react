import type { DataNode } from 'antd/es/tree'

export type CaseMode = 'auto' | 'manual'
export type TestLevel = 'smoke' | 'core' | 'extended'
export type CasePriority = 'p0' | 'p1' | 'p2' | 'p3'

export interface TagItem {
  id: string
  name: string
  color: string
}

export interface AutomationRun {
  id: string
  time: string
  result: 'Passed' | 'Failed' | 'Skipped'
  release: string
  duration: string
}

export interface TestCaseRecord {
  key: string
  id: string
  name: string
  tags: TagItem[]
  project: string
  component: string
  feature?: string
  owner: string
  type: CaseMode
  priority: CasePriority
  testType: TestLevel
  description?: string
  steps: string
  expectedResult: string
  isRegression: boolean
  createdAt: string
  updatedAt: string
  lastRun?: AutomationRun
}

export interface AdvancedFilters {
  priority: CasePriority[]
  testType: TestLevel[]
  type: CaseMode[]
  owner: string[]
}

export interface ProjectStructure {
  name: string
  components: {
    name: string
    features: string[]
  }[]
}

export type LibraryTreeNode = DataNode

export interface CaseFormValues {
  name: string
  tags: string[]
  project: string
  component: string
  feature: string
  owner: string
  isAutomated: boolean
  priority: CasePriority
  testType: TestLevel
  description?: string
  steps: string
  expectedResult: string
  isRegression: boolean
}

export interface BatchEditValues {
  owner?: string
  priority?: CasePriority
  component?: string
  testType?: TestLevel
}
