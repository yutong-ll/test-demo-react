import { useMemo } from 'react'
import { Card } from 'antd'
import { Radar } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import type { RadarMetric } from '../interface'

interface QualityRadarCardProps {
  metrics: RadarMetric[]
}

const QualityRadarCard: React.FC<QualityRadarCardProps> = ({ metrics }) => {
  const chartData: ChartData<'radar'> = useMemo(
    () => ({
      labels: metrics.map((metric) => metric.label),
      datasets: [
        {
          label: 'Current Release',
          data: metrics.map((metric) => metric.current),
          backgroundColor: 'rgba(22, 119, 255, 0.2)',
          borderColor: '#1677ff',
          pointBackgroundColor: '#1677ff',
          pointBorderColor: '#fff',
        },
        {
          label: 'Previous Release',
          data: metrics.map((metric) => metric.previous),
          backgroundColor: 'rgba(250, 173, 20, 0.2)',
          borderColor: '#faad14',
          pointBackgroundColor: '#faad14',
          pointBorderColor: '#fff',
        },
      ],
    }),
    [metrics],
  )

  const chartOptions: ChartOptions<'radar'> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 5,
          ticks: { display: false, stepSize: 1 },
          pointLabels: { font: { size: 10 } },
        },
      },
    }),
    [],
  )

  return (
    <Card title="Quality Radar" className="card-surface">
      <div className="h-72">
        <Radar data={chartData} options={chartOptions} />
      </div>
    </Card>
  )
}

export default QualityRadarCard

