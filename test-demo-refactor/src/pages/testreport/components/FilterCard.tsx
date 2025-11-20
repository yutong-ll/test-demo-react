import { Card, Col, Row, Select, Space, Typography } from 'antd'
import { ClockCircleOutlined } from '@ant-design/icons'
import type { ReportPlanOption } from '../interface'

interface FilterCardProps {
  planOptions: ReportPlanOption[]
  selectedPlan: string | null
  onPlanChange: (value: string | null) => void
  lastUpdated: string
}

const FilterCard: React.FC<FilterCardProps> = ({ planOptions, selectedPlan, onPlanChange, lastUpdated }) => (
  <Card className="card-surface" bodyStyle={{ padding: '16px 24px' }}>
    <Row gutter={24} align="middle">
      <Col flex="auto">
        <Space size="large" className="w-full">
          <div className="flex w-full max-w-xl items-center gap-3">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Select Test Plan:</span>
            <Select
              className="flex-1"
              allowClear
              size="large"
              placeholder="Choose a test plan"
              options={planOptions}
              value={selectedPlan ?? undefined}
              onChange={(value) => onPlanChange(value ?? null)}
            />
          </div>
        </Space>
      </Col>
      <Col flex="none">
        <Typography.Text type="secondary">
          <ClockCircleOutlined /> Last updated: {lastUpdated}
        </Typography.Text>
      </Col>
    </Row>
  </Card>
)

export default FilterCard

