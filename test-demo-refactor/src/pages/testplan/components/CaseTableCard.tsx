import type { FC } from 'react'
import { Button, Card, Empty, Select, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { PlanCase, TestCaseStatus } from '../interface'
import { testPlanPageClasses } from '../style'

interface CaseTableCardProps {
  data: PlanCase[]
  onStatusChange: (caseKey: string, status: TestCaseStatus) => void
  onLinkCases: () => void
}

const CaseTableCard: FC<CaseTableCardProps> = ({ data, onStatusChange, onLinkCases }) => {
  const statusOptions: { value: TestCaseStatus; label: React.ReactNode }[] = [
    { value: 'Passed', label: <Tag color="green" className="w-full text-center">Passed</Tag> },
    { value: 'Failed', label: <Tag color="red" className="w-full text-center">Failed</Tag> },
    { value: 'Blocked', label: <Tag color="orange" className="w-full text-center">Blocked</Tag> },
    { value: 'Not Run', label: <Tag className="w-full text-center">Not Run</Tag> },
  ]

  const columns: ColumnsType<PlanCase> = [
    { title: 'ID', dataIndex: 'id', width: 90 },
    { title: 'Title', dataIndex: 'title' },
    {
      title: 'Type',
      dataIndex: 'type',
      width: 90,
      render: (value) => (value === 'Auto' ? <Tag color="blue">Auto</Tag> : <Tag>Manual</Tag>),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
      render: (status, record) => (
        <Select
          value={status}
          onChange={(newValue) => onStatusChange(record.key, newValue)}
          options={statusOptions}
          size="small"
          bordered={false}
          dropdownMatchSelectWidth={false}
          style={{ width: '100%' }}
        />
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      width: 110,
      render: (priority) => <Tag color={priority === 'High' ? 'red' : priority === 'Medium' ? 'gold' : 'blue'}>{priority}</Tag>,
    },
  ]

  return (
    <Card
      title="Test Cases"
      className={testPlanPageClasses.caseCard}
      extra={
        <Button type="primary" ghost onClick={onLinkCases}>
          Link Existing Cases
        </Button>
      }
      bodyStyle={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', paddingTop: 0 }}
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey="key"
        size="small"
        pagination={false}
        locale={{ emptyText: <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No cases linked yet" /> }}
        scroll={{ y: 400 }}
      />
    </Card>
  )
}

export default CaseTableCard

