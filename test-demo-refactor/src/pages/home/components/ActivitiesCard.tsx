import { Button, Card, List, Tag } from 'antd'
import type { ActivityItem } from '../interface'
import { homePageClasses } from '../style'

interface ActivitiesCardProps {
  activities: ActivityItem[]
}

const ActivitiesCard: React.FC<ActivitiesCardProps> = ({ activities }) => (
  <Card
    className={homePageClasses.activityCard}
    title="Recent Activities"
    extra={
      <Button type="link" size="small">
        View All
      </Button>
    }
  >
    <List
      dataSource={activities}
      renderItem={(item) => (
        <List.Item>
          <div className="flex items-center gap-4">
            <Tag color={item.color} className="rounded-full px-3 py-1 text-base">
              {item.icon}
            </Tag>
            <div>
              <p className="text-sm text-gray-900">
                <strong>{item.name}</strong> {item.action}
              </p>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          </div>
        </List.Item>
      )}
    />
  </Card>
)

export default ActivitiesCard

