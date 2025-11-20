import type { FormInstance } from 'antd/es/form'

export type TagComponentTab = 'tags' | 'components'

export interface TagRecord {
  id: string
  name: string
  type: 'tag'
  createdAt: string
  updatedAt: string
}

export type ComponentStatus = 'Active' | 'Inactive' | 'Maintenance'

export interface ComponentRecord {
  id: string
  name: string
  description?: string
  status: ComponentStatus
  type: 'component'
  createdAt: string
  updatedAt: string
}

export interface ActionToolbarProps {
  placeholder: string
  buttonLabel: string
  searchValue: string
  onSearch: (value: string) => void
  onChange: (value: string) => void
  onCreate: () => void
}

export interface TagTableProps {
  dataSource: TagRecord[]
  onEdit: (record: TagRecord) => void
  onDelete: (id: string) => void
}

export interface ComponentTableProps {
  dataSource: ComponentRecord[]
  onEdit: (record: ComponentRecord) => void
  onDelete: (id: string) => void
}

export interface TagModalProps {
  open: boolean
  form: FormInstance
  isEditing: boolean
  onOk: () => void
  onCancel: () => void
}

export interface ComponentModalProps {
  open: boolean
  form: FormInstance
  isEditing: boolean
  onOk: () => void
  onCancel: () => void
}

export interface HeaderSectionProps {
  title: string
  description: string
}
