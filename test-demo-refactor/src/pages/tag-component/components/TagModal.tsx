import { Form, Input, Modal } from 'antd'
import type { TagModalProps } from '../interface'

const TagModal: React.FC<TagModalProps> = ({ open, form, isEditing, onOk, onCancel }) => (
  <Modal title={isEditing ? 'Edit Tag' : 'Create New Tag'} open={open} onOk={onOk} onCancel={onCancel}>
    <Form form={form} layout="vertical">
      <Form.Item name="name" label="Tag Name" rules={[{ required: true, message: 'Please enter a tag name' }]}>
        <Input placeholder="Please enter tag name" />
      </Form.Item>
    </Form>
  </Modal>
)

export default TagModal
