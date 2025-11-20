import { useState } from 'react'
import { Card, Form, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import HeaderSection from './components/HeaderSection'
import ActionToolbar from './components/ActionToolbar'
import TagTable from './components/TagTable'
import ComponentTable from './components/ComponentTable'
import TagModal from './components/TagModal'
import ComponentModal from './components/ComponentModal'
import { tagComponentPageClasses } from './style'
import type { ComponentRecord, TagComponentTab, TagRecord } from './interface'
import { initialComponents, initialTags } from './mock'

const TagComponentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TagComponentTab>('tags')
  const [tags, setTags] = useState<TagRecord[]>(initialTags)
  const [components, setComponents] = useState<ComponentRecord[]>(initialComponents)
  const [filteredTags, setFilteredTags] = useState<TagRecord[]>(initialTags)
  const [filteredComponents, setFilteredComponents] = useState<ComponentRecord[]>(initialComponents)
  const [searchTerm, setSearchTerm] = useState('')

  const [isTagModalOpen, setIsTagModalOpen] = useState(false)
  const [isComponentModalOpen, setIsComponentModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<TagRecord | null>(null)
  const [editingComponent, setEditingComponent] = useState<ComponentRecord | null>(null)

  const [tagForm] = Form.useForm<{ name: string }>()
  const [componentForm] = Form.useForm<{ name: string; description?: string; status: ComponentRecord['status'] }>()

  const applyFilters = (value: string, nextTags: TagRecord[] = tags, nextComponents: ComponentRecord[] = components) => {
    if (!value.trim()) {
      setFilteredTags(nextTags)
      setFilteredComponents(nextComponents)
      return
    }

    const normalized = value.toLowerCase()
    setFilteredTags(nextTags.filter((tag) => tag.name.toLowerCase().includes(normalized)))
    setFilteredComponents(
      nextComponents.filter(
        (item) =>
          item.name.toLowerCase().includes(normalized) || item.description?.toLowerCase().includes(normalized)
      )
    )
  }

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    applyFilters(value)
  }

  const openTagModal = (tag?: TagRecord) => {
    if (tag) {
      setEditingTag(tag)
      tagForm.setFieldsValue({ name: tag.name })
    } else {
      setEditingTag(null)
      tagForm.resetFields()
    }
    setIsTagModalOpen(true)
  }

  const closeTagModal = () => {
    setIsTagModalOpen(false)
    setEditingTag(null)
    tagForm.resetFields()
  }

  const openComponentModal = (component?: ComponentRecord) => {
    if (component) {
      setEditingComponent(component)
      componentForm.setFieldsValue({
        name: component.name,
        status: component.status,
        ...(component.description ? { description: component.description } : {}),
      })
    } else {
      setEditingComponent(null)
      componentForm.resetFields()
    }
    setIsComponentModalOpen(true)
  }

  const closeComponentModal = () => {
    setIsComponentModalOpen(false)
    setEditingComponent(null)
    componentForm.resetFields()
  }

  const handleTagSave = () => {
    tagForm.validateFields().then(({ name }) => {
      const now = new Date().toISOString()
      if (editingTag) {
        const updated = tags.map((tag) => (tag.id === editingTag.id ? { ...tag, name, updatedAt: now } : tag))
        setTags(updated)
        applyFilters(searchTerm, updated, components)
      } else {
        const newTag: TagRecord = { id: Date.now().toString(), name, type: 'tag', createdAt: now, updatedAt: now }
        const updated = [...tags, newTag]
        setTags(updated)
        applyFilters(searchTerm, updated, components)
      }
      closeTagModal()
    })
  }

  const handleComponentSave = () => {
    componentForm.validateFields().then(({ name, description, status }) => {
      const trimmedDescription = description?.trim()
      const now = new Date().toISOString()
      if (editingComponent) {
        const updated = components.map((component) => {
          if (component.id !== editingComponent.id) {
            return component
          }
          const nextComponent: ComponentRecord = { ...component, name, status, updatedAt: now }
          if (trimmedDescription) {
            nextComponent.description = trimmedDescription
          } else {
            delete nextComponent.description
          }
          return nextComponent
        })
        setComponents(updated)
        applyFilters(searchTerm, tags, updated)
      } else {
        const newComponent: ComponentRecord = {
          id: Date.now().toString(),
          name,
          status,
          type: 'component',
          createdAt: now,
          updatedAt: now,
          ...(trimmedDescription ? { description: trimmedDescription } : {}),
        }
        const updated = [...components, newComponent]
        setComponents(updated)
        applyFilters(searchTerm, tags, updated)
      }
      closeComponentModal()
    })
  }

  const handleDelete = (id: string, type: TagRecord['type'] | ComponentRecord['type']) => {
    if (type === 'tag') {
      const updated = tags.filter((tag) => tag.id !== id)
      setTags(updated)
      applyFilters(searchTerm, updated, components)
    } else {
      const updated = components.filter((component) => component.id !== id)
      setComponents(updated)
      applyFilters(searchTerm, tags, updated)
    }
  }

  const tabItems: TabsProps['items'] = [
    {
      key: 'tags',
      label: 'Tags Management',
      children: (
        <div className={tagComponentPageClasses.tabWrapper}>
          <ActionToolbar
            placeholder="Search tag name"
            buttonLabel="Create New Tag"
            searchValue={searchTerm}
            onSearch={handleSearch}
            onChange={handleSearch}
            onCreate={() => openTagModal()}
          />
          <div className="mt-4">
            <TagTable dataSource={filteredTags} onEdit={(record) => openTagModal(record)} onDelete={(id) => handleDelete(id, 'tag')} />
          </div>
        </div>
      ),
    },
    {
      key: 'components',
      label: 'Components Management',
      children: (
        <div className={tagComponentPageClasses.tabWrapper}>
          <ActionToolbar
            placeholder="Search component name"
            buttonLabel="Create New Component"
            searchValue={searchTerm}
            onSearch={handleSearch}
            onChange={handleSearch}
            onCreate={() => openComponentModal()}
          />
          <div className="mt-4">
            <ComponentTable
              dataSource={filteredComponents}
              onEdit={(record) => openComponentModal(record)}
              onDelete={(id) => handleDelete(id, 'component')}
            />
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className={tagComponentPageClasses.page}>
      <HeaderSection
        title="Manage Tags and Components"
        description="Create, search and maintain test tags and components."
      />

      <Card className={tagComponentPageClasses.tabsCard} bordered={false}>
        <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key as TagComponentTab)} items={tabItems} destroyInactiveTabPane={false} />
      </Card>

      <TagModal open={isTagModalOpen} form={tagForm} isEditing={Boolean(editingTag)} onOk={handleTagSave} onCancel={closeTagModal} />
      <ComponentModal
        open={isComponentModalOpen}
        form={componentForm}
        isEditing={Boolean(editingComponent)}
        onOk={handleComponentSave}
        onCancel={closeComponentModal}
      />
    </div>
  )
}

export default TagComponentPage
