import { Avatar, Card, List, Rate, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import type { EvaluationSummary } from '../interface'

interface EvaluationCardProps {
  summary: EvaluationSummary
}

const EvaluationCard: React.FC<EvaluationCardProps> = ({ summary }) => (
  <Card title="Plan Evaluations" className="card-surface">
    <div className="rounded-lg border border-gray-100 bg-gray-50 p-6 text-center">
      <Typography.Title level={2} className="!mb-1 text-blue-600">
        {summary.averageScore}
      </Typography.Title>
      <Rate allowHalf disabled defaultValue={summary.averageScore} />
      <div className="mt-2 text-sm text-gray-500">Based on {summary.totalReviews} Reviews</div>
    </div>

    <div className="mt-4 max-h-72 overflow-y-auto pr-2">
      <List
        itemLayout="horizontal"
        dataSource={summary.reviews}
        split={false}
        renderItem={(item) => (
          <List.Item className="border-b border-gray-100 last:border-b-0">
            <List.Item.Meta
              avatar={<Avatar style={{ backgroundColor: item.avatarColor }} icon={<UserOutlined />} />}
              title={
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{item.reviewer}</span>
                  <Typography.Text type="secondary" className="text-xs">
                    {item.date}
                  </Typography.Text>
                </div>
              }
              description={
                <div>
                  <Rate allowHalf disabled defaultValue={item.stars} style={{ fontSize: 12 }} />
                  <Typography.Paragraph className="!mb-0 mt-1 text-sm text-gray-700">{item.comment}</Typography.Paragraph>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  </Card>
)

export default EvaluationCard

