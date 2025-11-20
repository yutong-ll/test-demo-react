import { TestCase } from '@/types/testcase'

export interface TestCaseCardProps {
  data: TestCase
  onEdit?: (id: string) => void
  onExecute?: (id: string) => void
}
