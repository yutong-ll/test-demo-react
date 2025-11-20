import type { FC } from 'react'
import { Badge, Button, Card, Divider, Rate, Space, Tag, Typography } from 'antd'
import type { ExtendedDataNode, PlanNodeType, PlanStats, RatingData } from '../interface'
import { testPlanPageClasses } from '../style'

interface PlanSummaryCardProps {
  node: ExtendedDataNode | null
  nodeType: PlanNodeType
  hierarchyPath: string[]
  stats: PlanStats | null
  rating?: RatingData
  onToggleCritical: () => void
  onToggleDone: () => void
  onEvaluate: () => void
}

const typeTagConfig: Record<
  PlanNodeType,
  {
    color: string
    label: string
  }
> = {
  plan: { color: 'blue', label: 'Plan' },
  component: { color: 'green', label: 'Component' },
  feature: { color: 'purple', label: 'Feature' },
}

const PlanSummaryCard: FC<PlanSummaryCardProps> = ({
  node,
  nodeType,
  hierarchyPath,
  stats,
  rating,
  onToggleCritical,
  onToggleDone,
  onEvaluate,
}) => {
  if (!node) {
    return (
      <Card className={testPlanPageClasses.summaryCard}>
        <Typography.Title level={4} className="!mb-2">
          Summary
        </Typography.Title>
        <Typography.Paragraph type="secondary" className="!mb-0">
          Select a plan, component, or feature from the structure panel to see its summary.
        </Typography.Paragraph>
      </Card>
    )
  }

  const pathText = hierarchyPath.join(' › ')
  const typeConfig = typeTagConfig[nodeType]

  const statItems = [
    { label: 'Total Cases', value: stats ? stats.total : '—' },
    { label: 'Automation', value: stats ? stats.autoCount : '—' },
    { label: 'Pass Rate', value: stats ? `${stats.passRate}%` : '—' },
    { label: 'Sub Items', value: stats ? stats.subItemCount : '—' },
  ]

  return (
    <Card className={testPlanPageClasses.summaryCard}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Typography.Title level={4} className="!mb-0">
                {node.title}
              </Typography.Title>
              <Tag color={typeConfig.color} bordered={false}>
                {typeConfig.label}
              </Tag>
            </div>
            {nodeType === 'feature' && (
              <Space>
                <Button type={node.isCritical ? 'primary' : 'default'} danger={node.isCritical} onClick={onToggleCritical}>
                  {node.isCritical ? 'Mark Non-critical' : 'Mark Critical'}
                </Button>
                <Button type={node.isDone ? 'primary' : 'default'} onClick={onToggleDone}>
                  {node.isDone ? 'Mark Pending' : 'Mark Done'}
                </Button>
              </Space>
            )}
          </div>
          <Typography.Text type="secondary">{pathText}</Typography.Text>
        </div>

        {node.description && (
          <Typography.Paragraph className="!mb-0" type="secondary">
            {node.description}
          </Typography.Paragraph>
        )}

        <Divider className="!my-2" />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {statItems.map((item) => (
            <div key={item.label} className="flex flex-col">
              <Typography.Text type="secondary">{item.label}</Typography.Text>
              <Typography.Title level={4} className="!mb-0">
                {item.value}
              </Typography.Title>
            </div>
          ))}
        </div>

        <Divider className="!my-2" />

        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <Typography.Text type="secondary">Evaluation</Typography.Text>
            <div className="flex items-center gap-3">
              <Rate allowHalf disabled value={rating?.stars ?? 0} />
              <Badge status={rating ? 'processing' : 'default'} text={rating ? `${rating.stars} / 5` : 'Not evaluated'} />
            </div>
            {rating?.comment && (
              <Typography.Paragraph className="!mb-0 text-sm text-gray-500">{rating.comment}</Typography.Paragraph>
            )}
          </div>
          <Button type="primary" onClick={onEvaluate}>
            Evaluate
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default PlanSummaryCard


