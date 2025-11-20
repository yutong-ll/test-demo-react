import type { FC } from 'react'
import { Button, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { testPlanPageClasses } from '../style'

interface HeaderSectionProps {
  onCreatePlan: () => void
}

const HeaderSection: FC<HeaderSectionProps> = ({ onCreatePlan }) => (
  <div className={testPlanPageClasses.header}>
    <div className="space-y-1">
      <Typography.Title level={3} className="!mb-0">
        Test Plan Management
      </Typography.Title>
      <Typography.Paragraph type="secondary" className="!mb-0">
        Plan &gt; Component &gt; Feature Strategy
      </Typography.Paragraph>
    </div>
    <Button type="primary" icon={<PlusOutlined />} onClick={onCreatePlan}>
      Create Plan
    </Button>
  </div>
)

export default HeaderSection

