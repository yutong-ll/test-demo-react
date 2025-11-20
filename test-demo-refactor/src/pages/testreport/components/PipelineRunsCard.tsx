import { Card, Tag, Timeline, Typography } from 'antd'
import type { PipelineRun } from '../interface'

interface PipelineRunsCardProps {
  runs: PipelineRun[]
}

const PipelineRunsCard: React.FC<PipelineRunsCardProps> = ({ runs }) => (
  <Card title="Recent Pipeline Runs" className="card-surface">
    <div className="max-h-60 overflow-y-auto px-2">
      <Timeline
        mode="left"
        items={runs.map((run) => ({
          color: run.status === 'Success' ? 'green' : 'red',
          children: (
            <div className="pb-4">
              <div className="mb-1 flex justify-between">
                <Typography.Text strong>{run.id}</Typography.Text>
                <Tag color={run.status === 'Success' ? 'success' : 'error'}>{run.status}</Tag>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{run.time}</span>
                <span>
                  <Typography.Text code>{run.build}</Typography.Text>
                </span>
              </div>
            </div>
          ),
        }))}
      />
    </div>
  </Card>
)

export default PipelineRunsCard

