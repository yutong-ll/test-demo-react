import { Button, Popconfirm, Table } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { TagRecord, TagTableProps } from '../interface'
import { formatDate } from '@/utils/format'

const columns = (onEdit: TagTableProps['onEdit'], onDelete: TagTableProps['onDelete']): ColumnsType<TagRecord> => [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 120 },
  { title: 'Tag Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: 180,
    render: (value: string) => formatDate(value),
  },
  {
    title: 'Updated At',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    width: 180,
    render: (value: string) => formatDate(value),
  },
  {
    title: 'Actions',
    key: 'actions',
    width: 120,
    render: (_, record) => (
      <div className="flex gap-2">
        <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} />
        <Popconfirm
          title="Confirm Deletion"
          description="Are you sure you want to delete this tag?"
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

const TagTable: React.FC<TagTableProps> = ({ dataSource, onEdit, onDelete }) => (
  <Table columns={columns(onEdit, onDelete)} dataSource={dataSource} rowKey="id" pagination={false} />
)

export default TagTable
