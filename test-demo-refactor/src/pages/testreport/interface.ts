import type { ReactNode } from 'react'

export interface ReportFilterState {
  planId: string | null
}

export interface ReportPlanOption {
  label: string
  value: string
}

export interface ExecutionStat {
  title: string
  value: string
  subtitle: string
  icon: ReactNode
  color: string
  bg: string
}

export interface EvaluationReview {
  id: number
  reviewer: string
  avatarColor: string
  stars: number
  date: string
  comment: string
}

export interface EvaluationSummary {
  averageScore: number
  totalReviews: number
  reviews: EvaluationReview[]
}

export interface ExecutionStatusSegment {
  label: string
  value: number
  color: string
}

export interface ExecutionStatusDistribution {
  segments: ExecutionStatusSegment[]
  donePercent: number
  centerLabel: string
}

export interface ComponentProgressNode {
  key: string
  name: string
  total: number
  passed: number
  failed: number
  passRate: number
  bugs: number
  status?: 'Good' | 'Attention' | 'Critical'
  children?: ComponentProgressNode[]
}

export interface RadarMetric {
  label: string
  current: number
  previous: number
}

export interface AutomationCoverageMetric {
  label: string
  automated: number
  manual: number
}

export interface PipelineRun {
  id: string
  status: 'Success' | 'Failed'
  passed: number
  failed: number
  duration: string
  build: string
  time: string
}

export interface ReportExportOption {
  value: string
  label: string
}

export interface ReportMeta {
  lastUpdated: string
}
