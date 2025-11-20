import type { FC, ReactNode } from 'react'
import { useMemo } from 'react'
import { Button, Card, Tag, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import { PlusCircleOutlined } from '@ant-design/icons'
import type { ExtendedDataNode, PlanNodeType } from '../interface'
import { testPlanPageClasses } from '../style'

interface StructurePanelProps {
  data: ExtendedDataNode[]
  selectedKey: string
  expandedKeys: string[]
  onSelect: (key: string) => void
  onExpand: (keys: string[]) => void
  onAddComponent: (parentKey: string) => void
  onAddFeature: (parentKey: string) => void
}

const resolveNodeType = (key: string): PlanNodeType =>
  key.includes('plan') ? 'plan' : key.includes('comp') ? 'component' : 'feature'

const StructurePanel: FC<StructurePanelProps> = ({
  data,
  selectedKey,
  expandedKeys,
  onSelect,
  onExpand,
  onAddComponent,
  onAddFeature,
}) => {
  const processedTree = useMemo<DataNode[]>(() => {
    const decorateNode = (node: ExtendedDataNode): DataNode => {
      const type = resolveNodeType(String(node.key));
      let actions: ReactNode[] = [];
      if (type === 'plan') {
        actions = [
          <Button
            key="plan-action"
            type="text"
            size="small"
            icon={<PlusCircleOutlined className="text-blue-500" />}
            onClick={(event) => {
              event.stopPropagation()
              onAddComponent(String(node.key))
            }}
          />,
        ]
      } else if (type === 'component') {
        actions = [
          <Button
            key="component-action"
            type="text"
            size="small"
            icon={<PlusCircleOutlined className="text-emerald-500" />}
            onClick={(event) => {
              event.stopPropagation()
              onAddFeature(String(node.key))
            }}
          />,
        ]
      }

      // Fix for type error: ensure node argument matches DataNode type, not ExtendedDataNode
      const resolvedTitle =
        typeof node.title === 'function'
          // Cast node to DataNode for the title function
          ? node.title(node as unknown as DataNode)
          : node.title
      const title = (
        <div className="flex items-center justify-between gap-2 pr-1">
          <div className="flex items-center gap-2">
            <span>{resolvedTitle}</span>
            {type === 'feature' && node.isCritical && (
              <Tag color="red" bordered={false} className="text-[10px] leading-4">
                Critical
              </Tag>
            )}
            {type === 'feature' && node.isDone && (
              <Tag color="green" bordered={false} className="text-[10px] leading-4">
                Done
              </Tag>
            )}
          </div>
          <div className="flex items-center gap-1">{actions}</div>
        </div>
      )

      return {
        ...node,
        title,
        children: node.children?.map((child) => decorateNode(child)) || [],
      }
    }

    return data.map((node) => decorateNode(node))
  }, [data, onAddComponent, onAddFeature])

  return (
    <Card title="Structure" className={testPlanPageClasses.sidePanel}>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1">
          <Tree
            showIcon
            blockNode
            selectedKeys={[selectedKey]}
            expandedKeys={expandedKeys}
            onSelect={(keys) => keys[0] && onSelect(String(keys[0]))}
            onExpand={(keys) => onExpand(keys.map(String))}
            treeData={processedTree}
          />
        </div>
      </div>
    </Card>
  )
}

export default StructurePanel

