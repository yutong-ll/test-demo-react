import type { TestCase } from './testcase'

export interface TestPlanMilestone {
  id: string
  title: string
  date: string
}

export interface TestPlan {
  id: string
  name: string
  owner: string
  sprint: string
  startDate: string
  endDate: string
  coverage: number
  cases: TestCase[]
  milestones: TestPlanMilestone[]
}
