import type { DataNode } from 'antd/es/tree'

export type PlanNodeType = 'plan' | 'component' | 'feature'

export interface ExtendedDataNode extends Omit<DataNode, 'children'> {
  isCritical?: boolean | undefined
  isDone?: boolean | undefined
  description?: string | undefined
  children?: ExtendedDataNode[] | undefined
}


export type TestCaseStatus = 'Passed' | 'Failed' | 'Blocked' | 'Not Run'

export type TestCaseType = 'Auto' | 'Manual'

export type TestCasePriority = 'High' | 'Medium' | 'Low'

export interface PlanCase {
  key: string
  id: string
  title: string
  planId?: string | undefined
  componentId?: string | undefined
  featureId?: string | undefined
  type: TestCaseType
  status: TestCaseStatus
  priority: TestCasePriority
}

export type RepositoryCase = Omit<PlanCase, 'planId' | 'componentId' | 'featureId'>

export interface RatingData {
  stars: number
  comment: string
}

export interface PlanStats {
  total: number
  autoCount: number
  passRate: number
  subItemCount: number
}

export type FeatureToggleField = 'isCritical' | 'isDone'

export interface CreatePlanFormValues {
  planName: string
  description?: string | undefined
}

export interface AddComponentFormValues {
  component: string
}

export interface AddFeatureFormValues {
  featureName: string
}

export interface EvaluateFormValues {
  stars: number
  comment?: string | undefined
}
