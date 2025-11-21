import type { FC, Key } from "react";
import { Button, Card, Tree, Input } from "antd";
import type { DataNode } from "antd/es/tree";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { testCaseInlineStyles, testCasePageClasses } from "../style";
import { useState } from "react";

interface LibraryPanelProps {
  collapsed: boolean;
  selectedKeys: string[];
  treeData: DataNode[];
  onSelect: (keys: Key[]) => void;
  onToggle: () => void;
}

const filterTree = (
  treeData: DataNode[],
  treeSearchValue: string
): DataNode[] => {
  // 如果搜索值为空，返回完整树
  if (!treeSearchValue.trim()) {
    return treeData;
  }
  // 递归过滤树节点
  const filterNodes = (nodes: DataNode[]): DataNode[] => {
    return nodes
      .map((node) => {
        // 深拷贝节点以避免修改原始数据
        const newNode = { ...node };

        // 递归过滤子节点
        let filteredChildren: DataNode[] = [];
        if (node.children && node.children.length > 0) {
          filteredChildren = filterNodes(node.children);
        }

        // 检查当前节点标题是否匹配搜索值
        const isTitleMatch =
          node.title &&
          String(node.title)
            .toLowerCase()
            .includes(treeSearchValue.toLowerCase());

        // 如果当前节点匹配或有匹配的子节点，保留该节点
        if (isTitleMatch || filteredChildren.length > 0) {
          return {
            ...newNode,
            children:
              filteredChildren.length > 0 ? filteredChildren : node.children,
          };
        }

        // 节点不匹配且没有匹配的子节点，返回null
        return null;
      })
      .filter(Boolean) as DataNode[];
  };

  return filterNodes(treeData);
};

const LibraryPanel: FC<LibraryPanelProps> = ({
  collapsed,
  selectedKeys,
  treeData,
  onSelect,
  onToggle,
}) => {
  const [treeSearchValue, setTreeSearchValue] = useState("");
  if (collapsed) {
    return (
      <div className={testCasePageClasses.libraryCollapsed} onClick={onToggle}>
        <MenuUnfoldOutlined className="text-primary text-xl" />
        <div style={testCaseInlineStyles.verticalText}>LIBRARY</div>
      </div>
    );
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
            event.stopPropagation();
            onToggle();
          }}
        />
      }
    >
      {/* 添加搜索输入框 */}
      <div style={{ marginBottom: 12 }}>
        <Input
          placeholder="Search in Library"
          value={treeSearchValue}
          onChange={(e) => setTreeSearchValue(e.target.value)}
          // prefix={<SearchOutlined />}
          allowClear
          size="small"
        />
      </div>
      <Tree
        showIcon
        defaultExpandAll
        treeData={filterTree(treeData, treeSearchValue)}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
      />
    </Card>
  );
};

export default LibraryPanel;
