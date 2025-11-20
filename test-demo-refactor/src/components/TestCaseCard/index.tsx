import { Button, Card, Space, Tag, Typography } from 'antd'
import { EditOutlined, PlayCircleOutlined } from '@ant-design/icons'
import type { TestCaseCardProps } from './interface'
import { testCaseCardClasses } from './style'
import { formatDate } from '@/utils/format'

const statusColorMap: Record<string, string> = {
  pass: 'success',
  fail: 'error',
  block: 'warning',
  pending: 'processing',
}

/**
 * TestCaseCard
 * @description 展示单个测试用例的核心信息，包含优先级、执行状态与快捷操作按钮
 * @param data - 测试用例实体，包含标题、负责人、执行状态等
 * @param onEdit - 编辑当前测试用例的回调
 * @param onExecute - 触发回归执行的回调
 */
const TestCaseCard: React.FC<TestCaseCardProps> = ({ data, onEdit, onExecute }) => {
  const { wrapper, header, title, meta, tags, footer } = testCaseCardClasses

  return (
    <Card
      className={wrapper}
      variant="borderless"
      styles={{ body: { padding: '0.5rem 0' } }}
    >
      <div className={header}>
        <div>
          <Typography.Title level={5} className={title}>
            {data.title}
          </Typography.Title>
          <div className={meta}>
            {data.id} · 优先级 {data.priority} · 负责人 {data.owner}
          </div>
        </div>
        <Tag color={statusColorMap[data.status]}>{data.status.toUpperCase()}</Tag>
      </div>

      <div className={tags}>
        {data.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className={footer}>
        <span className="text-xs text-gray-500">
          最近执行：{formatDate(data.lastRunAt, 'MM-DD HH:mm')}
        </span>
        <Space size="small">
          <Button icon={<EditOutlined />} type="text" size="small" onClick={() => onEdit?.(data.id)}>
            编辑
          </Button>
          <Button
            icon={<PlayCircleOutlined />}
            type="primary"
            size="small"
            onClick={() => onExecute?.(data.id)}
          >
            执行
          </Button>
        </Space>
      </div>
    </Card>
  )
}

export default TestCaseCard
