import { Card, Progress, Tag } from 'antd'
import type { DeadlineItem, ProgressProject } from '../interface'
import { homePageClasses } from '../style'

interface ProjectProgressCardProps {
  projects: ProgressProject[]
  progressColors: Record<ProgressProject['color'], string>
  deadlines: DeadlineItem[]
}

const ProjectProgressCard: React.FC<ProjectProgressCardProps> = ({ projects, progressColors, deadlines }) => (
  <Card className={homePageClasses.progressCard} title="Project Progress">
    <div className="space-y-4">
      {projects.map((project) => (
        <div key={project.name} className="space-y-2">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{project.name}</span>
            <span className="font-semibold text-gray-900">{project.value}%</span>
          </div>
          <Progress
            percent={project.value}
            status="active"
            strokeColor={progressColors[project.color]}
            showInfo={false}
            trailColor="#f1f5f9"
          />
        </div>
      ))}
    </div>
    <div className={homePageClasses.deadlineCard}>
      <h4 className="text-sm font-semibold text-gray-900">Upcoming Deadlines</h4>
      {deadlines.map((deadline) => (
        <div
          key={deadline.name}
          className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 shadow-sm"
        >
          <span className="text-sm text-gray-700">{deadline.name}</span>
          <Tag color={deadline.color}>{deadline.time}</Tag>
        </div>
      ))}
    </div>
  </Card>
)

export default ProjectProgressCard

