import { useMemo } from 'react'
import { Card } from 'antd'
import { Bar } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import type { AutomationCoverageMetric } from '../interface'

interface AutomationCoverageCardProps {
  metrics: AutomationCoverageMetric[]
}

const AutomationCoverageCard: React.FC<AutomationCoverageCardProps> = ({ metrics }) => {
  const chartData: ChartData<'bar'> = useMemo(
    () => ({
      labels: metrics.map((metric) => metric.label),
      datasets: [
        {
          label: 'Automated',
          data: metrics.map((metric) => metric.automated),
          backgroundColor: '#1677ff',
          borderRadius: 4,
          barThickness: 20,
        },
        {
          label: 'Manual',
          data: metrics.map((metric) => metric.manual),
          backgroundColor: '#e6f4ff',
          borderRadius: 4,
          barThickness: 20,
        },
      ],
    }),
    [metrics],
  )

  const chartOptions: ChartOptions<'bar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
      },
      scales: {
        x: { stacked: true, grid: { display: false } },
        y: { stacked: true, beginAtZero: true, max: 100, ticks: { stepSize: 25 } },
      },
    }),
    [],
  )

  return (
    <Card title="Automation Coverage" className="card-surface">
      <div className="h-60">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </Card>
  )
}

export default AutomationCoverageCard

