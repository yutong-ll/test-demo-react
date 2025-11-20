import { Card, Statistic, Typography } from 'antd'
import type { ExecutionStat } from '../interface'

interface StatCardProps {
  stat: ExecutionStat
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => (
  <Card bordered={false} className="card-surface transition-all hover:-translate-y-1 hover:shadow-lg">
    <div
      className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
      style={{ backgroundColor: stat.bg, color: stat.color }}
    >
      {stat.icon}
    </div>
    <Statistic title={<Typography.Text type="secondary">{stat.title}</Typography.Text>} value={stat.value} valueStyle={{ fontWeight: 600 }} />
    <div className="mt-1 text-xs text-gray-500">{stat.subtitle}</div>
  </Card>
)

export default StatCard

