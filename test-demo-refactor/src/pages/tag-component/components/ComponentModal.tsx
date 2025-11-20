import { Form, Input, Modal, Select } from 'antd'
import type { ComponentModalProps, ComponentStatus } from '../interface'

const ComponentModal: React.FC<ComponentModalProps> = ({ open, form, isEditing, onOk, onCancel }) => (
  <Modal
    title={isEditing ? 'Edit Component' : 'Create New Component'}
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    width={600}
  >
    <Form form={form} layout="vertical">
      <Form.Item
        name="name"
        label="Component Name"
        rules={[{ required: true, message: 'Please enter a component name' }]}
      >
        <Input placeholder="Please enter component name" />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} placeholder="Please enter component description (optional)" />
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select a status' }]}
      >
        <Select<ComponentStatus> placeholder="Please select status">
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Inactive">Inactive</Select.Option>
          <Select.Option value="Maintenance">Maintenance</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  </Modal>
)

export default ComponentModal
