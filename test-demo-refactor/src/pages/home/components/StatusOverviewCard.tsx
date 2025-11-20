import { Card } from 'antd'
import { Doughnut } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'
import type { StatusBreakdownItem } from '../interface'
import '../utils/registerCharts'
import { homePageClasses } from '../style'

interface StatusOverviewCardProps {
  data: ChartData<'doughnut'>
  breakdown: StatusBreakdownItem[]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
  cutout: '70%' as const,
}

const StatusOverviewCard: React.FC<StatusOverviewCardProps> = ({ data, breakdown }) => (
  <Card className="card-surface" title="Test Case Status" styles={{ body: { paddingBottom: '1rem' } }}>
    <div className="h-64">
      <Doughnut data={data} options={chartOptions} />
    </div>
    <div className={homePageClasses.statusLegend}>
      {breakdown.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="h-3 w-3 rounded-full" style={{ background: item.color }} />
          <div>
            <p className="text-sm text-gray-500">{item.label}</p>
            <span className="text-base font-semibold text-gray-900">{item.value}%</span>
          </div>
        </div>
      ))}
    </div>
  </Card>
)

export default StatusOverviewCard

