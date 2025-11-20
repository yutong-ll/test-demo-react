export type TestPriority = 'P0' | 'P1' | 'P2'
export type TestCaseStatus = 'pass' | 'fail' | 'block' | 'pending'

export interface TestCaseStep {
  id: string
  action: string
  expected: string
}

export interface TestCase {
  id: string
  title: string
  priority: TestPriority
  owner: string
  lastRunAt: string
  status: TestCaseStatus
  tags: string[]
  steps: TestCaseStep[]
}
