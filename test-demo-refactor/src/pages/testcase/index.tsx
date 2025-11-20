import { useMemo, useState } from 'react'
import type { Key } from 'react'
import { Button, Card, Form, Input, Modal, Popconfirm, Space, Table, Tag, Tooltip, message } from 'antd'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import type { TestCaseRecord, AdvancedFilters, CaseFormValues, AutomationRun, BatchEditValues } from './interface'
import {
  availableTags,
  componentOptions,
  featureOptions,
  libraryTree,
  mockTestCases,
  ownerOptions as ownerList,
  priorityOptions,
  projectOptions,
  testTypeOptions,
  generateMockRuns,
  createDefaultCaseValues,
} from './mock'
import { testCasePageClasses } from './style'
import HeaderSection from './components/HeaderSection'
import LibraryPanel from './components/LibraryPanel'
import BatchActionBar from './components/BatchActionBar'
import TableToolbar from './components/TableToolbar'
import AdvancedFilterDrawer from './components/AdvancedFilterDrawer'
import CaseForm from './components/CaseForm'
import CaseViewModal from './components/CaseViewModal'
import HistoryModal from './components/HistoryModal'
import BatchEditModal from './components/BatchEditModal'
import dayjs from 'dayjs'
import { EditOutlined, DeleteOutlined, EyeOutlined, FilterOutlined } from '@ant-design/icons'

const ownerOptions = ownerList.map((owner) => ({ label: owner, value: owner }))
const tagOptions = availableTags.map((tag) => ({ label: tag.name, value: tag.name }))
const modeOptions = [
  { label: 'Auto', value: 'auto' },
  { label: 'Manual', value: 'manual' },
]

const initialFilters: AdvancedFilters = {
  priority: [],
  testType: [],
  type: [],
  owner: [],
}

const buildTagItems = (tags: string[]) =>
  tags.map((tag) => {
    const hit = availableTags.find((item) => item.name === tag)
    return hit ?? { id: tag, name: tag, color: 'blue' }
  })

const TestCasePage: React.FC = () => {
  const [isSidePanelCollapsed, setIsSidePanelCollapsed] = useState(false)
  const [dataSource, setDataSource] = useState<TestCaseRecord[]>(mockTestCases)
  const [selectedTreeKey, setSelectedTreeKey] = useState<string | null>(null)
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters>(initialFilters)
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingKey, setEditingKey] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [viewingCase, setViewingCase] = useState<TestCaseRecord | null>(null)
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false)
  const [historyData, setHistoryData] = useState<AutomationRun[]>([])
  const [selectedHistoryCase, setSelectedHistoryCase] = useState<TestCaseRecord | null>(null)
  const [isBatchEditModalOpen, setIsBatchEditModalOpen] = useState(false)

  const [createForm] = Form.useForm<CaseFormValues>()
  const [editForm] = Form.useForm<CaseFormValues>()
  const [batchEditForm] = Form.useForm<BatchEditValues>()

  const filteredData = useMemo(() => {
    let data = [...dataSource]
    if (selectedTreeKey) {
      const [type, value] = selectedTreeKey.split('|')
      data = data.filter((item) => {
        if (type === 'project') return item.project === value
        if (type === 'component') return item.component === value
        if (type === 'feature') return item.feature === value
        return true
      })
    }

    if (advancedFilters.priority.length) {
      data = data.filter((item) => advancedFilters.priority.includes(item.priority))
    }
    if (advancedFilters.testType.length) {
      data = data.filter((item) => advancedFilters.testType.includes(item.testType))
    }
    if (advancedFilters.type.length) {
      data = data.filter((item) => advancedFilters.type.includes(item.type))
    }
    if (advancedFilters.owner.length) {
      data = data.filter((item) => advancedFilters.owner.includes(item.owner))
    }
    return data
  }, [dataSource, selectedTreeKey, advancedFilters])

  const handleFilterChange = <K extends keyof AdvancedFilters>(key: K, values: AdvancedFilters[K]) => {
    setAdvancedFilters((prev) => ({ ...prev, [key]: values }))
  }

  const clearAdvancedFilters = () => setAdvancedFilters(initialFilters)

  const handleTreeSelect = (keys: Key[]) => {
    setSelectedTreeKey(keys.length ? (keys[0] as string) : null)
  }

  const openCreateModal = () => {
    createForm.resetFields()
    createForm.setFieldsValue({
      ...createDefaultCaseValues(),
      owner: ownerList[0],
    } as Partial<CaseFormValues>)
    setIsCreateModalOpen(true)
  }

  const handleCreateOk = async () => {
    try {
      const values = await createForm.validateFields()
      const newCase: TestCaseRecord = {
        key: Date.now().toString(),
        id: `TC-${1000 + dataSource.length + 1}`,
        name: values.name,
        tags: buildTagItems(values.tags || []),
        project: values.project,
        component: values.component,
        feature: values.feature,
        owner: values.owner,
        type: values.isAutomated ? 'auto' : 'manual',
        priority: values.priority,
        testType: values.testType,
        description: values.description,
        steps: values.steps,
        expectedResult: values.expectedResult,
        isRegression: values.isRegression,
        createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        lastRun: values.isAutomated ? generateMockRuns(1, new Date().toISOString())[0] : undefined,
      }
      setDataSource((prev) => [newCase, ...prev])
      setIsCreateModalOpen(false)
      message.success('Test case created')
    } catch {
      // validation handled by form
    }
  }

  const handleOpenView = (record: TestCaseRecord) => {
    setViewingCase(record)
    setIsViewModalOpen(true)
  }

  const handleOpenEdit = (record: TestCaseRecord) => {
    setEditingKey(record.key)
    editForm.setFieldsValue({
      name: record.name,
      tags: record.tags.map((tag) => tag.name),
      project: record.project,
      component: record.component,
      feature: record.feature,
      owner: record.owner,
      isAutomated: record.type === 'auto',
      priority: record.priority,
      testType: record.testType,
      description: record.description,
      steps: record.steps,
      expectedResult: record.expectedResult,
      isRegression: record.isRegression,
    })
    setIsViewModalOpen(false)
    setIsEditModalOpen(true)
  }

  const handleEditOk = async () => {
    try {
      const values = await editForm.validateFields()
      setDataSource((prev) =>
        prev.map((item) =>
          item.key === editingKey
            ? {
              ...item,
              ...values,
              type: values.isAutomated ? 'auto' : 'manual',
              tags: buildTagItems(values.tags || []),
              updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }
            : item,
        ),
      )
      setIsEditModalOpen(false)
      setEditingKey(null)
      message.success('Test case updated')
    } catch {
      // validation handled by form
    }
  }

  const handleDelete = (key: string) => {
    setDataSource((prev) => prev.filter((item) => item.key !== key))
    message.success('Deleted')
  }

  const handleBatchDelete = () => {
    Modal.confirm({
      title: `Delete ${selectedRowKeys.length} test cases?`,
      content: 'This action cannot be undone.',
      okText: 'Yes, Delete',
      okType: 'danger',
      onOk: () => {
        setDataSource((prev) => prev.filter((item) => !selectedRowKeys.includes(item.key)))
        setSelectedRowKeys([])
        message.success(`Deleted ${selectedRowKeys.length} items`)
      },
    })
  }

  const handleBatchExport = () => {
    message.loading('Exporting...', 1).then(() => message.success(`Exported ${selectedRowKeys.length} items to CSV`))
  }

  const handleOpenBatchEdit = () => {
    batchEditForm.resetFields()
    setIsBatchEditModalOpen(true)
  }

  const handleBatchEditOk = async () => {
    try {
      const values = await batchEditForm.validateFields()
      if (!Object.values(values).some(Boolean)) {
        setIsBatchEditModalOpen(false)
        return
      }

      setDataSource((prev) =>
        prev.map((item) =>
          selectedRowKeys.includes(item.key)
            ? {
              ...item,
              ...values,
              updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            }
            : item,
        ),
      )
      setIsBatchEditModalOpen(false)
      setSelectedRowKeys([])
      message.success(`Updated ${selectedRowKeys.length} items`)
    } catch {
      // ignore validation
    }
  }

  const handleOpenHistory = (record: TestCaseRecord) => {
    setSelectedHistoryCase(record)
    setHistoryData(generateMockRuns(10, record.lastRun?.time || new Date().toISOString()))
    setIsHistoryModalOpen(true)
  }

  const getColumnSearchProps = (dataIndex: keyof TestCaseRecord, placeholder: string): ColumnType<TestCaseRecord> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(event) => event.stopPropagation()}>
        <Input
          placeholder={`Search ${placeholder}`}
          value={selectedKeys[0]}
          onChange={(event) => setSelectedKeys(event.target.value ? [event.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button type="primary" onClick={() => confirm()} size="small" icon={<FilterOutlined />}>
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters?.()
              confirm()
            }}
            size="small"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => {
      const target = record[dataIndex]
      return Array.isArray(target)
        ? target.some((tag) => tag.name.toLowerCase().includes((value as string).toLowerCase()))
        : String(target).toLowerCase().includes((value as string).toLowerCase())
    },
  })

  const columns: ColumnsType<TestCaseRecord> = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 100, fixed: 'left' },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 240,
      ellipsis: true,
      ...getColumnSearchProps('name', 'Name'),
      render: (text, record) => (
        <Space>
          <EyeOutlined className="text-primary cursor-pointer" onClick={() => handleOpenView(record)} />
          <span className="text-primary font-medium cursor-pointer" onClick={() => handleOpenView(record)}>
            {text}
          </span>
        </Space>
      ),
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 140,
      ...getColumnSearchProps('tags', 'Tags'),
      render: (tags) => {
        if (!tags?.length) return <span className="text-gray-400">-</span>
        const [first, ...rest] = tags
        const tooltipContent = (
          <div className="flex flex-col gap-1">
            {rest.map((tag) => (
              <Tag key={tag.id} color={tag.color}>
                {tag.name}
              </Tag>
            ))}
          </div>
        )
        return (
          <div className="flex items-center gap-1">
            <Tag color={first.color} className="max-w-[100px] truncate">
              {first.name}
            </Tag>
            {rest.length > 0 && (
              <Tooltip title={tooltipContent} color="#fff">
                <Tag>+{rest.length}</Tag>
              </Tooltip>
            )}
          </div>
        )
      },
    },
    { title: 'Component', dataIndex: 'component', width: 140 },
    { title: 'Owner', dataIndex: 'owner', width: 120, ...getColumnSearchProps('owner', 'Owner') },
    {
      title: 'Mode',
      dataIndex: 'type',
      width: 100,
      filters: [
        { text: 'Auto', value: 'auto' },
        { text: 'Manual', value: 'manual' },
      ],
      onFilter: (value, record) => record.type === value,
      render: (type, record) => {
        if (type === 'manual') {
          return <Tag color="gold">Manual</Tag>
        }
        const tooltipContent = record.lastRun ? (
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Run Time:</span>
              <span>{record.lastRun.time}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Release:</span>
              <span>{record.lastRun.release}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Result:</span>
              <span
                className="font-semibold"
                style={{
                  color:
                      record.lastRun.result === 'Passed'
                        ? '#52c41a'
                        : record.lastRun.result === 'Failed'
                          ? '#ff4d4f'
                          : '#faad14',
                }}
              >
                {record.lastRun.result}
              </span>
            </div>
            {record.lastRun.duration && (
              <div className="flex justify-between">
                <span className="text-gray-500">Duration:</span>
                <span>{record.lastRun.duration}</span>
              </div>
            )}
          </div>
        ) : (
          <div>Never run</div>
        )
        return (
          <Tooltip title={tooltipContent}>
            <Tag color="blue" className="cursor-pointer" onClick={() => handleOpenHistory(record)}>
                Auto
            </Tag>
          </Tooltip>
        )
      },
    },
    {
      title: 'Test Type',
      dataIndex: 'testType',
      width: 120,
      filters: [
        { text: 'Smoke', value: 'smoke' },
        { text: 'Core', value: 'core' },
        { text: 'Extended', value: 'extended' },
      ],
      onFilter: (value, record) => record.testType === value,
      render: (type) => {
        const color = type === 'smoke' ? 'purple' : type === 'core' ? 'geekblue' : 'cyan'
        return <Tag color={color}>{type.toUpperCase()}</Tag>
      },
    },
    { title: 'Project', dataIndex: 'project', width: 140 },
    {
      title: 'Imp',
      dataIndex: 'priority',
      width: 90,
      filters: ['p0', 'p1', 'p2', 'p3'].map((value) => ({ text: value.toUpperCase(), value })),
      onFilter: (value, record) => record.priority === value,
      render: (priority) => <Tag color={priority === 'p0' ? 'red' : 'blue'}>{priority.toUpperCase()}</Tag>,
    },
    { title: 'Updated', dataIndex: 'updatedAt', width: 160 },
    {
      title: 'Actions',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space>
          <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleOpenEdit(record)} />
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record.key)}>
            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className={testCasePageClasses.page}>
      <HeaderSection />
      <div className={testCasePageClasses.splitLayout}>
        <div className={`${testCasePageClasses.leftPanelWrapper} ${isSidePanelCollapsed ? 'w-12' : 'w-64'}`}>
          <LibraryPanel
            collapsed={isSidePanelCollapsed}
            treeData={libraryTree}
            selectedKeys={selectedTreeKey ? [selectedTreeKey] : []}
            onSelect={handleTreeSelect}
            onToggle={() => setIsSidePanelCollapsed((prev) => !prev)}
          />
        </div>
        <div className={testCasePageClasses.splitRight}>
          <Card bodyStyle={{ padding: 0 }} className={testCasePageClasses.tableCard}>
            {selectedRowKeys.length > 0 && (
              <BatchActionBar
                count={selectedRowKeys.length}
                onBatchEdit={handleOpenBatchEdit}
                onExport={handleBatchExport}
                onDelete={handleBatchDelete}
              />
            )}
            <TableToolbar
              total={filteredData.length}
              filterLabel={selectedTreeKey ? selectedTreeKey.split('|')[1] : undefined}
              onClearFilter={() => setSelectedTreeKey(null)}
              onOpenFilters={() => setIsFilterDrawerOpen(true)}
              onCreate={openCreateModal}
            />
            <Table
              rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }}
              columns={columns}
              dataSource={filteredData}
              rowKey="key"
              scroll={{ x: 1500, y: 'calc(100vh - 320px)' }}
              pagination={{ pageSize: 20 }}
            />
          </Card>
        </div>
      </div>

      <AdvancedFilterDrawer
        open={isFilterDrawerOpen}
        filters={advancedFilters}
        onClose={() => setIsFilterDrawerOpen(false)}
        onReset={clearAdvancedFilters}
        onChange={handleFilterChange}
        priorityOptions={priorityOptions}
        testTypeOptions={testTypeOptions}
        modeOptions={modeOptions}
        ownerOptions={ownerOptions}
        resultCount={filteredData.length}
      />

      <Modal
        title="Create Test Case"
        open={isCreateModalOpen}
        onOk={handleCreateOk}
        onCancel={() => setIsCreateModalOpen(false)}
        width={800}
        okText="Create"
        maskClosable={false}
      >
        <CaseForm
          form={createForm}
          tagOptions={tagOptions}
          projectOptions={projectOptions}
          componentOptions={componentOptions}
          featureOptions={featureOptions}
          ownerOptions={ownerOptions}
          priorityOptions={priorityOptions}
          testTypeOptions={testTypeOptions}
        />
      </Modal>

      <Modal
        title="Edit Case"
        open={isEditModalOpen}
        onOk={handleEditOk}
        onCancel={() => setIsEditModalOpen(false)}
        width={800}
        okText="Save Changes"
        maskClosable={false}
        style={{ top: 20 }}
      >
        <CaseForm
          form={editForm}
          tagOptions={tagOptions}
          projectOptions={projectOptions}
          componentOptions={componentOptions}
          featureOptions={featureOptions}
          ownerOptions={ownerOptions}
          priorityOptions={priorityOptions}
          testTypeOptions={testTypeOptions}
        />
      </Modal>

      <CaseViewModal
        open={isViewModalOpen}
        record={viewingCase}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={() => viewingCase && handleOpenEdit(viewingCase)}
      />

      <BatchEditModal
        open={isBatchEditModalOpen}
        form={batchEditForm}
        onSubmit={handleBatchEditOk}
        onCancel={() => setIsBatchEditModalOpen(false)}
        targetCount={selectedRowKeys.length}
        ownerOptions={ownerOptions}
        priorityOptions={priorityOptions}
        componentOptions={componentOptions}
        testTypeOptions={testTypeOptions}
      />

      <HistoryModal
        open={isHistoryModalOpen}
        caseId={selectedHistoryCase?.id}
        dataSource={historyData}
        onClose={() => setIsHistoryModalOpen(false)}
      />
    </div>
  )
}

export default TestCasePage
