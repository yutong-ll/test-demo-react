import { Card } from 'antd'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import type { StatCard as StatCardType } from '../interface'

interface StatCardProps {
  card: StatCardType
}

const iconClassMap: Record<StatCardType['type'], string> = {
  success: 'bg-emerald-50 text-emerald-600',
  danger: 'bg-rose-50 text-rose-600',
  info: 'bg-sky-50 text-sky-600',
}

const StatCard: React.FC<StatCardProps> = ({ card }) => {
  const trendPositive = card.type !== 'danger'

  return (
    <Card className="card-surface h-full" styles={{ body: { padding: '1.5rem' } }}>
      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${iconClassMap[card.type]}`}>
        {card.icon}
      </div>
      <p className="text-sm text-gray-500">{card.title}</p>
      <h3 className="mt-1 text-2xl font-semibold text-gray-900">{card.value}</h3>
      <div className={`mt-3 flex items-center gap-1 text-sm ${trendPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trendPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
        <span>{card.trend}</span>
      </div>
    </Card>
  )
}

export default StatCard

