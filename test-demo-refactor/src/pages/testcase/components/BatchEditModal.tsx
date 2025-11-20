import type { FC } from 'react'
import { Alert, Form, Modal, Select } from 'antd'
import type { FormInstance } from 'antd/es/form'
import type { BatchEditValues } from '../interface'
import type { SelectProps } from 'antd'

interface BatchEditModalProps {
  open: boolean
  form: FormInstance<BatchEditValues>
  onSubmit: () => void
  onCancel: () => void
  targetCount: number
  ownerOptions: SelectProps['options']
  priorityOptions: SelectProps['options']
  componentOptions: SelectProps['options']
  testTypeOptions: SelectProps['options']
}

const BatchEditModal: FC<BatchEditModalProps> = ({
  open,
  form,
  onSubmit,
  onCancel,
  targetCount,
  ownerOptions,
  priorityOptions,
  componentOptions,
  testTypeOptions,
}) => (
  <Modal
    title="Batch Edit Test Cases"
    open={open}
    onOk={onSubmit}
    onCancel={onCancel}
    okText={`Update ${targetCount} Items`}
  >
    <Alert message="Leave fields blank to keep existing values." type="info" showIcon className="mb-4" />
    <Form form={form} layout="vertical">
      <Form.Item label="Owner" name="owner">
        <Select placeholder="No Change" allowClear options={ownerOptions} />
      </Form.Item>
      <Form.Item label="Priority" name="priority">
        <Select placeholder="No Change" allowClear options={priorityOptions} />
      </Form.Item>
      <Form.Item label="Component" name="component">
        <Select placeholder="No Change" allowClear options={componentOptions} />
      </Form.Item>
      <Form.Item label="Test Type" name="testType">
        <Select placeholder="No Change" allowClear options={testTypeOptions} />
      </Form.Item>
    </Form>
  </Modal>
)

export default BatchEditModal

