import { Timeline } from 'antd'
import { TestPlan } from '@/types/testplan'

interface MilestoneListProps {
  plan: TestPlan
}

const MilestoneList: React.FC<MilestoneListProps> = ({ plan }) => (
  <Timeline
    items={plan.milestones.map((milestone) => ({
      key: milestone.id,
      color: 'blue',
      children: (
        <div>
          <p className="font-medium">{milestone.title}</p>
          <p className="text-xs text-gray-500">{milestone.date}</p>
        </div>
      ),
    }))}
  />
)

export default MilestoneList
