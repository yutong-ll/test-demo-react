import { useMemo } from 'react'
import { Card } from 'antd'
import { Doughnut } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import type { ExecutionStatusDistribution } from '../interface'

interface ExecutionStatusCardProps {
  distribution: ExecutionStatusDistribution
}

const ExecutionStatusCard: React.FC<ExecutionStatusCardProps> = ({ distribution }) => {
  const chartData: ChartData<'doughnut'> = useMemo(
    () => ({
      labels: distribution.segments.map((segment) => segment.label),
      datasets: [
        {
          data: distribution.segments.map((segment) => segment.value),
          backgroundColor: distribution.segments.map((segment) => segment.color),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }),
    [distribution],
  )

  const chartOptions: ChartOptions<'doughnut'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: '75%',
      plugins: {
        legend: {
          position: 'right',
          labels: { boxWidth: 10 },
        },
      },
    }),
    [],
  )

  return (
    <Card title="Overall Execution Status" className="card-surface">
      <div className="relative h-60">
        <Doughnut data={chartData} options={chartOptions} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-3xl font-semibold">{distribution.donePercent}%</div>
          <div className="text-xs text-gray-500">{distribution.centerLabel}</div>
        </div>
      </div>
    </Card>
  )
}

export default ExecutionStatusCard

