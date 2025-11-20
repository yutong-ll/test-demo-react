import type { FC } from 'react'
import { Button, Divider, Space } from 'antd'
import { DeleteOutlined, DownloadOutlined, EditOutlined } from '@ant-design/icons'
import { testCasePageClasses } from '../style'

interface BatchActionBarProps {
  count: number
  onBatchEdit: () => void
  onExport: () => void
  onDelete: () => void
}

const BatchActionBar: FC<BatchActionBarProps> = ({ count, onBatchEdit, onExport, onDelete }) => (
  <div className={testCasePageClasses.batchBar}>
    <Space>
      <span className="text-primary font-medium">{count} Selected</span>
      <Divider type="vertical" />
      <Button size="small" icon={<EditOutlined />} onClick={onBatchEdit}>
        Batch Edit
      </Button>
      <Button size="small" icon={<DownloadOutlined />} onClick={onExport}>
        Export
      </Button>
    </Space>
    <Button type="primary" danger size="small" icon={<DeleteOutlined />} onClick={onDelete}>
      Delete
    </Button>
  </div>
)

export default BatchActionBar

