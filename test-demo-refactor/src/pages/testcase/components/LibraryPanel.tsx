import type { FC, Key } from 'react'
import { Button, Card, Tree } from 'antd'
import type { DataNode } from 'antd/es/tree'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { testCaseInlineStyles, testCasePageClasses } from '../style'

interface LibraryPanelProps {
  collapsed: boolean
  selectedKeys: string[]
  treeData: DataNode[]
  onSelect: (keys: Key[]) => void
  onToggle: () => void
}

const LibraryPanel: FC<LibraryPanelProps> = ({ collapsed, selectedKeys, treeData, onSelect, onToggle }) => {
  if (collapsed) {
    return (
      <div className={testCasePageClasses.libraryCollapsed} onClick={onToggle}>
        <MenuUnfoldOutlined className="text-primary text-xl" />
        <div style={testCaseInlineStyles.verticalText}>LIBRARY</div>
      </div>
    )
  }

  return (
    <Card
      size="small"
      title="Library"
      className="card-surface h-full"
      extra={
        <Button
          type="text"
          icon={<MenuFoldOutlined />}
          onClick={(event) => {
            event.stopPropagation()
            onToggle()
          }}
        />
      }
    >
      <Tree showIcon defaultExpandAll treeData={treeData} onSelect={onSelect} selectedKeys={selectedKeys} />
    </Card>
  )
}

export default LibraryPanel

