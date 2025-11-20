import type { FC } from 'react'
import { Button, Drawer, Select } from 'antd'
import type { SelectProps } from 'antd'
import type { AdvancedFilters, CaseMode, CasePriority, TestLevel } from '../interface'
import { testCasePageClasses } from '../style'

interface AdvancedFilterDrawerProps {
  open: boolean
  filters: AdvancedFilters
  onClose: () => void
  onReset: () => void
  onChange: <K extends keyof AdvancedFilters>(key: K, values: AdvancedFilters[K]) => void
  priorityOptions: SelectProps['options']
  testTypeOptions: SelectProps['options']
  modeOptions: { label: string; value: CaseMode }[]
  ownerOptions: SelectProps['options']
  resultCount: number
}

const AdvancedFilterDrawer: FC<AdvancedFilterDrawerProps> = ({
  open,
  filters,
  onClose,
  onReset,
  onChange,
  priorityOptions,
  testTypeOptions,
  modeOptions,
  ownerOptions,
  resultCount,
}) => (
  <Drawer
    title="Advanced Filters"
    placement="right"
    onClose={onClose}
    open={open}
    width={320}
    extra={
      <Button size="small" onClick={onReset}>
        Reset
      </Button>
    }
  >
    <div className={testCasePageClasses.drawerSection}>
      <span className={testCasePageClasses.drawerLabel}>Priority</span>
      <Select
        mode="multiple"
        placeholder="Select Priority"
        allowClear
        options={priorityOptions as SelectProps['options']}
        value={filters.priority}
        onChange={(values) => onChange('priority', values as CasePriority[])}
      />
    </div>
    <div className={testCasePageClasses.drawerSection}>
      <span className={testCasePageClasses.drawerLabel}>Test Type</span>
      <Select
        mode="multiple"
        placeholder="Select Type"
        allowClear
        options={testTypeOptions as SelectProps['options']}
        value={filters.testType}
        onChange={(values) => onChange('testType', values as TestLevel[])}
      />
    </div>
    <div className={testCasePageClasses.drawerSection}>
      <span className={testCasePageClasses.drawerLabel}>Execution Mode</span>
      <Select
        mode="multiple"
        placeholder="Select Mode"
        allowClear
        options={modeOptions}
        value={filters.type}
        onChange={(values) => onChange('type', values as CaseMode[])}
      />
    </div>
    <div className={testCasePageClasses.drawerSection}>
      <span className={testCasePageClasses.drawerLabel}>Owner</span>
      <Select
        mode="multiple"
        placeholder="Select Owner"
        allowClear
        options={ownerOptions}
        value={filters.owner}
        onChange={(values) => onChange('owner', values as string[])}
      />
    </div>
    <div className="mt-12">
      <Button type="primary" block onClick={onClose}>
        Show Results ({resultCount})
      </Button>
    </div>
  </Drawer>
)

export default AdvancedFilterDrawer

