import { Button, Popconfirm, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { ComponentRecord, ComponentTableProps } from '../interface'
import { formatDate } from '@/utils/format'

const statusColors: Record<ComponentRecord['status'], string> = {
  Active: '#52c41a',
  Inactive: '#d9d9d9',
  Maintenance: '#faad14',
}

const columns = (onEdit: ComponentTableProps['onEdit'], onDelete: ComponentTableProps['onDelete']): ColumnsType<ComponentRecord> => [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 120 },
  { title: 'Component Name', dataIndex: 'name', key: 'name', width: 200 },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (value?: string) => value || <span className="text-gray-400">No description</span>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    width: 130,
    render: (status: ComponentRecord['status']) => <span style={{ color: statusColors[status] }}>{status}</span>,
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
    render: (value: string) => formatDate(value),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 140,
    render: (_, record) => (
      <div className="flex gap-2">
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} />
        <Popconfirm
          title="Confirm Deletion"
          description="Are you sure you want to delete this component?"
          okText="Confirm"
          cancelText="Cancel"
          onConfirm={() => onDelete(record.id)}
        >
          <Button type="link" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    ),
  },
]

const ComponentTable: React.FC<ComponentTableProps> = ({ dataSource, onEdit, onDelete }) => (
  <Table columns={columns(onEdit, onDelete)} dataSource={dataSource} rowKey="id" pagination={false} />
)

export default ComponentTable
