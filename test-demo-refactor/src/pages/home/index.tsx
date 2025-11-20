import { useMemo, useState } from 'react'
import { Button, Col, Row, Typography } from 'antd'
import {
  ArrowUpOutlined,
  CheckCircleOutlined,
  RobotOutlined,
  UserAddOutlined,
  WarningOutlined,
} from '@ant-design/icons'
import type {
  ActivityItem,
  DeadlineItem,
  ProgressProject,
  StatCard as StatCardType,
  StatusBreakdownItem,
  Timeframe,
  TimeframeOption,
} from './interface'
import { homePageClasses } from './style'
import StatCard from './components/StatCard'
import ExecutionTrendCard from './components/ExecutionTrendCard'
import StatusOverviewCard from './components/StatusOverviewCard'
import ActivitiesCard from './components/ActivitiesCard'
import ProjectProgressCard from './components/ProjectProgressCard'

const timeframeOptions: TimeframeOption[] = [
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
]

const timeframeConfigs: Record<Timeframe, number[]> = {
  weekly: [120, 190, 150, 220, 180, 90, 60],
  monthly: [820, 900, 950, 870, 990, 1020, 980],
  yearly: [5200, 6100, 6400, 7000, 7200, 7800, 8600],
}

const statCards: StatCardType[] = [
  {
    id: 'total-test-cases',
    title: 'Total Test Cases',
    value: '2,845',
    icon: <UserAddOutlined />,
    trend: '+12.5% vs last month',
    type: 'success',
  },
  {
    id: 'execution-rate',
    title: 'Execution Rate',
    value: '87.3%',
    icon: <CheckCircleOutlined />,
    trend: '+4.2% vs last month',
    type: 'success',
  },
  {
    id: 'failed-cases',
    title: 'Failed Cases',
    value: '143',
    icon: <WarningOutlined />,
    trend: '+2.1% vs last month',
    type: 'danger',
  },
  {
    id: 'automation-coverage',
    title: 'Automation Coverage',
    value: '68.5%',
    icon: <RobotOutlined />,
    trend: '+8.7% vs last month',
    type: 'info',
  },
]

const activities: ActivityItem[] = [
  {
    name: 'Jane Smith',
    action: 'created 12 new test cases',
    time: '2 hours ago',
    icon: <UserAddOutlined />,
    color: 'processing',
  },
  {
    name: 'Mike Johnson',
    action: 'executed 35 test cases',
    time: '5 hours ago',
    icon: <CheckCircleOutlined />,
    color: 'success',
  },
  {
    name: 'Sarah Williams',
    action: 'reported 8 failed cases',
    time: 'Yesterday',
    icon: <WarningOutlined />,
    color: 'error',
  },
  {
    name: 'John Doe',
    action: 'updated test plan "v2.4 Release"',
    time: '2 days ago',
    icon: <RobotOutlined />,
    color: 'warning',
  },
]

const progressProjects: ProgressProject[] = [
  { name: 'E-commerce Platform', value: 85, color: 'blue' },
  { name: 'Mobile Banking App', value: 62, color: 'cyan' },
  { name: 'CRM System', value: 45, color: 'orange' },
  { name: 'Inventory Management', value: 92, color: 'green' },
]

const progressColors: Record<ProgressProject['color'], string> = {
  blue: '#165DFF',
  cyan: '#3ABFF8',
  orange: '#FBBD23',
  green: '#36D399',
}

const statusBreakdown: StatusBreakdownItem[] = [
  { label: 'Passed', value: 72, color: '#36D399' },
  { label: 'Failed', value: 5, color: '#F87272' },
  { label: 'Blocked', value: 8, color: '#FBBD23' },
  { label: 'Not Run', value: 15, color: '#3ABFF8' },
]

const deadlines: DeadlineItem[] = [
  { name: 'E-commerce UAT', color: 'orange', time: '3 days' },
  { name: 'Banking App Release', color: 'red', time: '1 week' },
]

const HomePage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>('weekly')

  const executionTrend = useMemo(
    () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Passed',
          data: timeframeConfigs[timeframe],
          borderColor: '#36D399',
          backgroundColor: 'rgba(54, 211, 153, 0.2)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Failed',
          data: timeframeConfigs[timeframe].map((value) => Math.max(5, Math.round(value * 0.08))),
          borderColor: '#F87272',
          backgroundColor: 'rgba(248, 114, 114, 0.15)',
          tension: 0.4,
          fill: true,
        },
      ],
    }),
    [timeframe],
  )

  const statusData = useMemo(
    () => ({
      labels: statusBreakdown.map((item) => item.label),
      datasets: [
        {
          data: statusBreakdown.map((item) => item.value),
          backgroundColor: statusBreakdown.map((item) => item.color),
          borderWidth: 0,
        },
      ],
    }),
    [],
  )

  return (
    <div className={homePageClasses.page}>
      <section className={homePageClasses.header}>
        <div>
          <Typography.Title level={3} className="!mb-1">
            Home
          </Typography.Title>
          <Typography.Paragraph className="!mb-0 text-gray-500">
            Overview of your test management activities
          </Typography.Paragraph>
        </div>
        <Button type="primary" icon={<ArrowUpOutlined />}>
          Export Report
        </Button>
      </section>

      <Row gutter={[16, 16]}>
        {statCards.map((card) => (
          <Col xs={24} sm={12} lg={6} key={card.id}>
            <StatCard card={card} />
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={16}>
          <ExecutionTrendCard
            timeframe={timeframe}
            data={executionTrend}
            onTimeframeChange={setTimeframe}
            timeframes={timeframeOptions}
          />
        </Col>
        <Col xs={24} xl={8}>
          <StatusOverviewCard data={statusData} breakdown={statusBreakdown} />
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={14}>
          <ActivitiesCard activities={activities} />
        </Col>
        <Col xs={24} xl={10}>
          <ProjectProgressCard projects={progressProjects} progressColors={progressColors} deadlines={deadlines} />
        </Col>
      </Row>
    </div>
  )
}

export default HomePage
