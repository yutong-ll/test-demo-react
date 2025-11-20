import { useMemo, useState } from 'react'
import { Form, Input, Modal, Rate, Select, message } from 'antd'
import type { Key } from 'react'
import HeaderSection from './components/HeaderSection'
import StructurePanel from './components/StructurePanel'
import PlanSummaryCard from './components/PlanSummaryCard'
import CaseTableCard from './components/CaseTableCard'
import LinkCaseModal from './components/LinkCaseModal'
import { testPlanPageClasses } from './style'
import type {
  AddComponentFormValues,
  AddFeatureFormValues,
  CreatePlanFormValues,
  EvaluateFormValues,
  ExtendedDataNode,
  FeatureToggleField,
  PlanCase,
  PlanNodeType,
  PlanStats,
  RatingData,
} from './interface'
import {
  componentLibraryOptions,
  defaultExpandedKeys,
  defaultSelectedKey,
  generateInitialCases,
  initialPlanHierarchy,
  repositoryCases,
} from './mock'

const { TextArea } = Input

interface SelectedNodeInfo {
  node: ExtendedDataNode | null
  type: PlanNodeType
  path: string[]
}

const resolveNodeType = (key: string): PlanNodeType =>
  key.includes('plan') ? 'plan' : key.includes('comp') ? 'component' : 'feature'

const findNodeInfo = (nodes: ExtendedDataNode[], key: string, trail: string[] = []): SelectedNodeInfo => {
  for (const node of nodes) {
    const currentPath = [...trail, node.title as string]
    const type = resolveNodeType(String(node.key))
    if (node.key === key) {
      return { node, type, path: currentPath }
    }
    if (node.children) {
      const nested = findNodeInfo(node.children, key, currentPath)
      if (nested.node) return nested
    }
  }
  return { node: null, type: 'plan', path: [] }
}

const updateTreeNode = (nodes: ExtendedDataNode[], key: string, updates: Partial<ExtendedDataNode>): ExtendedDataNode[] =>
  nodes.map((node) => {
    if (node.key === key) return { ...node, ...updates }
    if (node.children) {
      return { ...node, children: updateTreeNode(node.children, key, updates) }
    }
    return node
  })

const TestPlanPage: React.FC = () => {
  const [planHierarchy, setPlanHierarchy] = useState<ExtendedDataNode[]>(initialPlanHierarchy)
  const [allTestCases, setAllTestCases] = useState<PlanCase[]>(generateInitialCases())
  const [expandedKeys, setExpandedKeys] = useState<string[]>(defaultExpandedKeys)
  const [selectedKey, setSelectedKey] = useState<string>(defaultSelectedKey)
  const [ratings, setRatings] = useState<Record<string, RatingData>>({})

  const [createPlanModalOpen, setCreatePlanModalOpen] = useState(false)
  const [addComponentModalOpen, setAddComponentModalOpen] = useState(false)
  const [addFeatureModalOpen, setAddFeatureModalOpen] = useState(false)
  const [evaluateModalOpen, setEvaluateModalOpen] = useState(false)
  const [linkCaseModalOpen, setLinkCaseModalOpen] = useState(false)

  const [selectedCasesToLink, setSelectedCasesToLink] = useState<Key[]>([])
  const [currentParentKey, setCurrentParentKey] = useState<string>('')

  const [createPlanForm] = Form.useForm<CreatePlanFormValues>()
  const [addComponentForm] = Form.useForm<AddComponentFormValues>()
  const [addFeatureForm] = Form.useForm<AddFeatureFormValues>()
  const [evaluateForm] = Form.useForm<EvaluateFormValues>()

  const { node: selectedNode, type: selectedType, path: hierarchyPath } = useMemo(
    () => findNodeInfo(planHierarchy, selectedKey),
    [planHierarchy, selectedKey],
  )

  const { filteredCases, stats } = useMemo(() => {
    if (!selectedNode) return { filteredCases: [], stats: null as PlanStats | null }
    const cases = allTestCases.filter((testCase) => {
      if (selectedType === 'plan') return testCase.planId === selectedKey
      if (selectedType === 'component') return testCase.componentId === selectedKey
      if (selectedType === 'feature') return testCase.featureId === selectedKey
      return false
    })
    const total = cases.length
    const passed = cases.filter((testCase) => testCase.status === 'Passed').length
    const autoCount = cases.filter((testCase) => testCase.type === 'Auto').length
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0
    const subItemCount = selectedNode.children ? selectedNode.children.length : 0
    return { filteredCases: cases, stats: { total, autoCount, passRate, subItemCount } }
  }, [allTestCases, selectedKey, selectedNode, selectedType])

  const handleStatusChange = (caseKey: string, newStatus: PlanCase['status']) => {
    setAllTestCases((prev) => prev.map((item) => (item.key === caseKey ? { ...item, status: newStatus } : item)))
    message.success(`Status updated to ${newStatus}`)
  }

  const handleFeatureToggle = (field: FeatureToggleField) => {
    if (!selectedNode || selectedType !== 'feature') return
    const toggledValue = !(selectedNode[field] ?? false)
    const updates: Partial<ExtendedDataNode> =
      field === 'isCritical'
        ? { isCritical: toggledValue, isDone: toggledValue ? false : selectedNode.isDone }
        : { isDone: toggledValue, isCritical: toggledValue ? false : selectedNode.isCritical }
    setPlanHierarchy((prev) => updateTreeNode(prev, selectedNode.key as string, updates))
  }

  const handleLinkCasesOk = () => {
    const casesToAdd = repositoryCases.filter((item) => selectedCasesToLink.includes(item.key))
    const mapped = casesToAdd.map((item) => ({
      ...item,
      key: `linked-${Date.now()}-${item.key}`,
      planId: selectedType === 'plan' ? selectedKey : undefined,
      componentId: selectedType === 'component' ? selectedKey : undefined,
      featureId: selectedType === 'feature' ? selectedKey : undefined,
    }))
    setAllTestCases((prev) => [...prev, ...mapped])
    setSelectedCasesToLink([])
    setLinkCaseModalOpen(false)
    message.success(`Linked ${mapped.length} cases`)
  }

  const openAddComponentModal = (parentKey: string) => {
    setCurrentParentKey(parentKey)
    addComponentForm.resetFields()
    setAddComponentModalOpen(true)
  }

  const openAddFeatureModal = (parentKey: string) => {
    setCurrentParentKey(parentKey)
    addFeatureForm.resetFields()
    setAddFeatureModalOpen(true)
  }

  const handleCreatePlanOk = () => {
    createPlanForm.validateFields().then((values) => {
      const newPlan: ExtendedDataNode = {
        title: values.planName,
        key: `plan-${Date.now()}`,
        description: values.description,
        children: [],
      }
      setPlanHierarchy((prev) => [...prev, newPlan])
      setCreatePlanModalOpen(false)
      createPlanForm.resetFields()
      message.success('Plan created')
    })
  }

  const handleAddComponentOk = () => {
    addComponentForm.validateFields().then((values) => {
      const update = (nodes: ExtendedDataNode[]): ExtendedDataNode[] =>
        nodes.map((node) => {
          if (node.key === currentParentKey) {
            const nextChildren = [...(node.children || []), { title: values.component, key: `comp-${Date.now()}`, children: [] }]
            return { ...node, children: nextChildren }
          }
          return { ...node, children: node.children ? update(node.children) : node.children }
        })
      setPlanHierarchy((prev) => update(prev))
      setAddComponentModalOpen(false)
      addComponentForm.resetFields()
      setExpandedKeys((prev) => Array.from(new Set([...prev, currentParentKey])))
    })
  }

  const handleAddFeatureOk = () => {
    addFeatureForm.validateFields().then((values) => {
      const update = (nodes: ExtendedDataNode[]): ExtendedDataNode[] =>
        nodes.map((node) => {
          if (node.key === currentParentKey) {
            const nextChildren = [
              ...(node.children || []),
              { title: values.featureName, key: `feat-${Date.now()}`, isCritical: false, isDone: false },
            ]
            return { ...node, children: nextChildren }
          }
          return { ...node, children: node.children ? update(node.children) : node.children }
        })
      setPlanHierarchy((prev) => update(prev))
      setAddFeatureModalOpen(false)
      addFeatureForm.resetFields()
      setExpandedKeys((prev) => Array.from(new Set([...prev, currentParentKey])))
    })
  }

  const handleEvaluateOk = () => {
    evaluateForm.validateFields().then((values) => {
      setRatings((prev) => ({ ...prev, [selectedKey]: { stars: values.stars, comment: values.comment || '' } }))
      setEvaluateModalOpen(false)
      message.success('Evaluation saved')
    })
  }

  return (
    <div className={testPlanPageClasses.page}>
      <HeaderSection onCreatePlan={() => setCreatePlanModalOpen(true)} />
      <div className={testPlanPageClasses.layout}>
        <StructurePanel
          data={planHierarchy}
          selectedKey={selectedKey}
          expandedKeys={expandedKeys}
          onSelect={setSelectedKey}
          onExpand={setExpandedKeys}
          onAddComponent={openAddComponentModal}
          onAddFeature={openAddFeatureModal}
        />

        <div className={testPlanPageClasses.splitRight}>
          <PlanSummaryCard
            node={selectedNode}
            nodeType={selectedType}
            hierarchyPath={hierarchyPath}
            stats={stats}
            rating={ratings[selectedKey]}
            onToggleCritical={() => handleFeatureToggle('isCritical')}
            onToggleDone={() => handleFeatureToggle('isDone')}
            onEvaluate={() => {
              const existing = ratings[selectedKey]
              evaluateForm.setFieldsValue({ stars: existing?.stars ?? 0, comment: existing?.comment ?? '' })
              setEvaluateModalOpen(true)
            }}
          />
          <CaseTableCard data={filteredCases} onStatusChange={handleStatusChange} onLinkCases={() => setLinkCaseModalOpen(true)} />
        </div>
      </div>

      <Modal title="New Plan" open={createPlanModalOpen} onOk={handleCreatePlanOk} onCancel={() => setCreatePlanModalOpen(false)}>
        <Form form={createPlanForm} layout="vertical">
          <Form.Item name="planName" label="Name" rules={[{ required: true, message: 'Plan name is required' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Add Component" open={addComponentModalOpen} onOk={handleAddComponentOk} onCancel={() => setAddComponentModalOpen(false)}>
        <Form form={addComponentForm} layout="vertical">
          <Form.Item name="component" label="Select Component" rules={[{ required: true, message: 'Component is required' }]}>
            <Select options={componentLibraryOptions} placeholder="Choose component" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Add Feature" open={addFeatureModalOpen} onOk={handleAddFeatureOk} onCancel={() => setAddFeatureModalOpen(false)}>
        <Form form={addFeatureForm} layout="vertical">
          <Form.Item name="featureName" label="Feature Name" rules={[{ required: true, message: 'Feature name is required' }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Evaluate Test Plan"
        open={evaluateModalOpen}
        onOk={handleEvaluateOk}
        onCancel={() => setEvaluateModalOpen(false)}
        okText="Save Evaluation"
      >
        <Form form={evaluateForm} layout="vertical">
          <Form.Item name="stars" label="Quality Rating" rules={[{ required: true, message: 'Rating is required' }]}>
            <Rate />
          </Form.Item>
          <Form.Item name="comment" label="Comments">
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <LinkCaseModal
        open={linkCaseModalOpen}
        onOk={handleLinkCasesOk}
        onCancel={() => {
          setLinkCaseModalOpen(false)
          setSelectedCasesToLink([])
        }}
        cases={repositoryCases}
        selectedKeys={selectedCasesToLink}
        onChangeSelection={setSelectedCasesToLink}
      />
    </div>
  )
}

export default TestPlanPage
