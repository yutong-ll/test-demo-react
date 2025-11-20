import type { FC } from 'react'
import { Button, Descriptions, Modal, Space, Tag } from 'antd'
import { BugOutlined } from '@ant-design/icons'
import type { TestCaseRecord } from '../interface'

interface CaseViewModalProps {
  open: boolean
  record: TestCaseRecord | null
  onClose: () => void
  onEdit: () => void
}

const CaseViewModal: FC<CaseViewModalProps> = ({ open, record, onClose, onEdit }) => (
  <Modal
    title={
      record && (
        <div className="flex items-center justify-between gap-4">
          <span>
            {record.id} - Details
          </span>
          <Space>
            {record.isRegression && (
              <Tag icon={<BugOutlined />} color="volcano">
                Regression
              </Tag>
            )}
            <Tag color={record.type === 'auto' ? 'blue' : 'gold'}>
              {record.type === 'auto' ? 'AUTOMATED' : 'MANUAL'}
            </Tag>
          </Space>
        </div>
      )
    }
    open={open}
    onCancel={onClose}
    width={800}
    footer={[
      <Button key="edit" type="primary" onClick={onEdit}>
        Edit Case
      </Button>,
      <Button key="close" onClick={onClose}>
        Close
      </Button>,
    ]}
  >
    {record && (
      <Descriptions bordered size="small" column={2}>
        <Descriptions.Item label="Name" span={2}>
          <strong>{record.name}</strong>
        </Descriptions.Item>
        <Descriptions.Item label="Steps" span={2}>
          <div className="bg-gray-50 rounded-md p-2 whitespace-pre-wrap">{record.steps}</div>
        </Descriptions.Item>
        <Descriptions.Item label="Expected Result" span={2}>
          <div className="whitespace-pre-wrap">{record.expectedResult}</div>
        </Descriptions.Item>
        <Descriptions.Item label="Project">{record.project}</Descriptions.Item>
        <Descriptions.Item label="Component">{record.component}</Descriptions.Item>
        <Descriptions.Item label="Feature">{record.feature}</Descriptions.Item>
        <Descriptions.Item label="Owner">{record.owner}</Descriptions.Item>
        <Descriptions.Item label="Priority">
          <Tag color={record.priority === 'p0' ? 'red' : 'blue'}>{record.priority.toUpperCase()}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Test Type">
          <Tag>{record.testType.toUpperCase()}</Tag>
        </Descriptions.Item>
        <Descriptions.Item label="Tags">
          {record.tags.map((tag) => (
            <Tag key={tag.id} color={tag.color}>
              {tag.name}
            </Tag>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">{record.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Updated At">{record.updatedAt}</Descriptions.Item>
        <Descriptions.Item label="Description" span={2}>
          <div className="whitespace-pre-wrap">{record.description || 'No description provided.'}</div>
        </Descriptions.Item>
      </Descriptions>
    )}
  </Modal>
)

export default CaseViewModal

