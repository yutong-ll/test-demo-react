import type { FC, ReactNode } from "react";
import { useMemo, useState } from "react";
import { Button, Card, Tag, Tree, Input } from "antd";
import type { DataNode } from "antd/es/tree";
import { PlusCircleOutlined } from "@ant-design/icons";
import type { ExtendedDataNode, PlanNodeType } from "../interface";
import { testPlanPageClasses } from "../style";

interface StructurePanelProps {
  data: ExtendedDataNode[];
  selectedKey: string;
  expandedKeys: string[];
  onSelect: (key: string) => void;
  onExpand: (keys: string[]) => void;
  onAddComponent: (parentKey: string) => void;
  onAddFeature: (parentKey: string) => void;
}

const resolveNodeType = (key: string): PlanNodeType =>
  key.includes("plan")
    ? "plan"
    : key.includes("comp")
    ? "component"
    : "feature";

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

const StructurePanel: FC<StructurePanelProps> = ({
  data,
  selectedKey,
  expandedKeys,
  onSelect,
  onExpand,
  onAddComponent,
  onAddFeature,
}) => {
  const [treeSearchValue, setTreeSearchValue] = useState("");
  const processedTree = useMemo<DataNode[]>(() => {
    const decorateNode = (node: ExtendedDataNode): DataNode => {
      const type = resolveNodeType(String(node.key));
      let actions: ReactNode[] = [];
      if (type === "plan") {
        actions = [
          <Button
            key="plan-action"
            type="text"
            size="small"
            icon={<PlusCircleOutlined className="text-blue-500" />}
            onClick={(event) => {
              event.stopPropagation();
              onAddComponent(String(node.key));
            }}
          />,
        ];
      } else if (type === "component") {
        actions = [
          <Button
            key="component-action"
            type="text"
            size="small"
            icon={<PlusCircleOutlined className="text-emerald-500" />}
            onClick={(event) => {
              event.stopPropagation();
              onAddFeature(String(node.key));
            }}
          />,
        ];
      }

      // Fix for type error: ensure node argument matches DataNode type, not ExtendedDataNode
      const resolvedTitle =
        typeof node.title === "function"
          ? // Cast node to DataNode for the title function
            node.title(node as unknown as DataNode)
          : node.title;
      const title = (
        <div className="flex items-center justify-between gap-2 pr-1">
          <div className="flex items-center gap-2">
            <span>{resolvedTitle}</span>
            {type === "feature" && node.isCritical && (
              <Tag
                color="red"
                bordered={false}
                className="text-[10px] leading-4"
              >
                Critical
              </Tag>
            )}
            {type === "feature" && node.isDone && (
              <Tag
                color="green"
                bordered={false}
                className="text-[10px] leading-4"
              >
                Done
              </Tag>
            )}
          </div>
          <div className="flex items-center gap-1">{actions}</div>
        </div>
      );

      const childNodes: DataNode[] = (node.children ?? []).map((child) =>
        decorateNode(child)
      );
      const { children: _ignored, ...rest } = node;

      return {
        ...rest,
        title,
        children: childNodes,
      } satisfies DataNode;
    };

    return data.map((node) => decorateNode(node));
  }, [data, onAddComponent, onAddFeature]);

  return (
    <Card title="Structure" className={testPlanPageClasses.sidePanel}>
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto pr-1">
          {/* 添加搜索输入框 */}
          <div style={{ marginBottom: 12 }}>
            <Input
              placeholder="Search in Structure"
              value={treeSearchValue}
              onChange={(e) => setTreeSearchValue(e.target.value)}
              // prefix={<SearchOutlined />}
              allowClear
              size="small"
            />
          </div>
          <Tree
            showIcon
            blockNode
            selectedKeys={[selectedKey]}
            expandedKeys={expandedKeys}
            onSelect={(keys) => keys[0] && onSelect(String(keys[0]))}
            onExpand={(keys) => onExpand(keys.map(String))}
            treeData={filterTree(processedTree, treeSearchValue)}
          />
        </div>
      </div>
    </Card>
  );
};

export default StructurePanel;
