import type { TestPlan } from '@/types/testplan'

export interface TestPlanPanelProps {
  plan: TestPlan
  onNavigateReport?: (planId: string) => void
}
