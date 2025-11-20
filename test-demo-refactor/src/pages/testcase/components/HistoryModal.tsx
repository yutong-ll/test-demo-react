import type { FC } from 'react'
import { Button, Modal, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { ClockCircleOutlined } from '@ant-design/icons'
import type { AutomationRun } from '../interface'

interface HistoryModalProps {
  open: boolean
  caseId?: string | undefined
  dataSource: AutomationRun[]
  onClose: () => void
}

const columns: ColumnsType<AutomationRun> = [
  {
    title: 'Result',
    dataIndex: 'result',
    render: (value: AutomationRun['result']) => (
      <Tag color={value === 'Passed' ? 'success' : value === 'Failed' ? 'error' : 'warning'}>{value}</Tag>
    ),
  },
  { title: 'Time', dataIndex: 'time' },
  { title: 'Release', dataIndex: 'release' },
  { title: 'Duration', dataIndex: 'duration' },
]

const HistoryModal: FC<HistoryModalProps> = ({ open, caseId, dataSource, onClose }) => (
  <Modal
    title={
      <Space>
        <ClockCircleOutlined />
        <span>Run History: {caseId ?? 'N/A'}</span>
      </Space>
    }
    open={open}
    onCancel={onClose}
    width={800}
    footer={[
      <Button key="close" onClick={onClose}>
        Close
      </Button>,
    ]}
  >
    <Table dataSource={dataSource} rowKey="id" size="small" pagination={{ pageSize: 5 }} columns={columns} />
  </Modal>
)

export default HistoryModal

