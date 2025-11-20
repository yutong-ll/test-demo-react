import { Badge, Card, Table, Typography } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { ComponentProgressNode } from '../interface'

interface ComponentProgressCardProps {
  data: ComponentProgressNode[]
}

const statusColorMap: Record<NonNullable<ComponentProgressNode['status']>, 'success' | 'warning' | 'error'> = {
  Good: 'success',
  Attention: 'warning',
  Critical: 'error',
}

const ComponentProgressCard: React.FC<ComponentProgressCardProps> = ({ data }) => {
  const columns: ColumnsType<ComponentProgressNode> = [
    { title: 'Component / Feature', dataIndex: 'name', key: 'name', width: '35%' },
    {
      title: 'Execution Result',
      key: 'execution',
      width: '25%',
      render: (_, record) => {
        const passPercent = record.total ? (record.passed / record.total) * 100 : 0
        const failPercent = record.total ? (record.failed / record.total) * 100 : 0
        return (
          <div className="w-11/12">
            <div className="mb-1 flex justify-between text-xs">
              <span>
                <span className="text-green-600">{record.passed}</span> / {record.total}
              </span>
              {record.failed > 0 && <span className="text-red-500">{record.failed} Fail</span>}
            </div>
            <div className="flex h-2 w-full overflow-hidden rounded bg-gray-100">
              <div className="h-full bg-green-500" style={{ width: `${passPercent}%` }} />
              <div className="h-full bg-red-500" style={{ width: `${failPercent}%` }} />
            </div>
          </div>
        )
      },
    },
    {
      title: 'Pass Rate',
      dataIndex: 'passRate',
      key: 'passRate',
      align: 'center',
      width: '15%',
      render: (value: number) => <Typography.Text strong>{value}%</Typography.Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '15%',
      render: (value: ComponentProgressNode['status'], record) => {
        if (record.children?.length) {
          return <Typography.Text type="secondary">-</Typography.Text>
        }
        if (!value) {
          return null
        }
        return <Badge status={statusColorMap[value]} text={value} />
      },
    },
  ]

  return (
    <Card title="Component Progress Details" className="card-surface">
      <Table<ComponentProgressNode> className="custom-table" columns={columns} dataSource={data} pagination={false} size="middle" />
    </Card>
  )
}

export default ComponentProgressCard

