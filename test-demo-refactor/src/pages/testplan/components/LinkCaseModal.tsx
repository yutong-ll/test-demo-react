import type { FC } from 'react'
import { Modal, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { RepositoryCase } from '../interface'

interface LinkCaseModalProps {
  open: boolean
  cases: RepositoryCase[]
  selectedKeys: React.Key[]
  onChangeSelection: (keys: React.Key[]) => void
  onOk: () => void
  onCancel: () => void
}

const LinkCaseModal: FC<LinkCaseModalProps> = ({ open, cases, selectedKeys, onChangeSelection, onOk, onCancel }) => {
  const columns: ColumnsType<RepositoryCase> = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Title', dataIndex: 'title' },
    { title: 'Priority', dataIndex: 'priority' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <Tag>{value}</Tag>,
    },
  ]

  return (
    <Modal
      title="Link Cases from Repository"
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={720}
      okText={`Link Selected (${selectedKeys.length})`}
      okButtonProps={{ disabled: selectedKeys.length === 0 }}
    >
      <Table
        dataSource={cases}
        columns={columns}
        pagination={false}
        size="small"
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: selectedKeys,
          onChange: (keys) => onChangeSelection(keys),
        }}
        rowKey="key"
      />
    </Modal>
  )
}

export default LinkCaseModal

