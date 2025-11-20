import { Button, Card, Space } from 'antd'
import { Line } from 'react-chartjs-2'
import type { ChartData } from 'chart.js'
import type { Timeframe, TimeframeOption } from '../interface'
import '../utils/registerCharts'

interface ExecutionTrendCardProps {
  timeframe: Timeframe
  data: ChartData<'line'>
  timeframes: TimeframeOption[]
  onTimeframeChange: (value: Timeframe) => void
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

const ExecutionTrendCard: React.FC<ExecutionTrendCardProps> = ({ data, timeframe, timeframes, onTimeframeChange }) => (
  <Card
    title="Test Execution Trend"
    extra={
      <Space>
        {timeframes.map((option) => (
          <Button
            key={option.value}
            type={timeframe === option.value ? 'primary' : 'default'}
            size="small"
            onClick={() => onTimeframeChange(option.value)}
          >
            {option.label}
          </Button>
        ))}
      </Space>
    }
    className="card-surface"
    styles={{ body: { height: 320 } }}
  >
    <Line data={data} options={chartOptions} />
  </Card>
)

export default ExecutionTrendCard

