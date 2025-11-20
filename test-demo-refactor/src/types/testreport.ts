export interface TestReportTrendPoint {
  id: string
  label: string
  passRate: number
  regression: number
}

export interface TestReport {
  id: string
  planId: string
  generatedAt: string
  author: string
  summary: string
  passRate: number
  regressionRate: number
  trend: TestReportTrendPoint[]
}
