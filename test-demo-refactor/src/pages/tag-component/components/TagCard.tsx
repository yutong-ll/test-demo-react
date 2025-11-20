import { Card, Progress, Tag } from 'antd'
import type { TagMeta } from '@/types/tag'

interface TagCardProps {
  tag: TagMeta
}

const TagCard: React.FC<TagCardProps> = ({ tag }) => (
  <Card className="card-surface" variant="borderless">
    <div className="flex items-center justify-between">
      <Tag color={tag.color}>{tag.name}</Tag>
      <span className="text-xs text-gray-500">使用 {tag.usage} 次</span>
    </div>
    <Progress percent={Math.min(100, tag.usage * 3)} showInfo={false} strokeColor="#1677ff" className="mt-2" />
  </Card>
)

export default TagCard
