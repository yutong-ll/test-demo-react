import type { FC } from 'react'
import { Button, Space, Tag } from 'antd'
import { FilterOutlined, PlusOutlined } from '@ant-design/icons'
import { testCasePageClasses } from '../style'

interface TableToolbarProps {
  total: number
  filterLabel?: string | undefined
  onClearFilter: () => void
  onOpenFilters: () => void
  onCreate: () => void
}

const TableToolbar: FC<TableToolbarProps> = ({ total, filterLabel, onClearFilter, onOpenFilters, onCreate }) => (
  <div className={testCasePageClasses.tableToolbar}>
    <Space>
      <span className="font-semibold text-gray-900">All Test Cases ({total})</span>
      {filterLabel && (
        <Tag closable onClose={onClearFilter}>
          Filter: {filterLabel}
        </Tag>
      )}
    </Space>
    <Space>
      <Button type="default" icon={<FilterOutlined />} onClick={onOpenFilters}>
        Filters
      </Button>
      <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
        Create Case
      </Button>
    </Space>
  </div>
)

export default TableToolbar

