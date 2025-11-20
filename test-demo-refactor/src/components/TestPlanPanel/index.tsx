import { Button, Card, Divider, Progress, Statistic } from 'antd'
import { LineChartOutlined } from '@ant-design/icons'
import type { TestPlanPanelProps } from './interface'
import { testPlanPanelClasses } from './style'
import { formatDate } from '@/utils/format'

/**
 * TestPlanPanel
 * @description 展示测试计划进度与关键指标，支持跳转报告
 */
const TestPlanPanel: React.FC<TestPlanPanelProps> = ({ plan, onNavigateReport }) => {
  const { wrapper, header, timeline, metrics } = testPlanPanelClasses

  return (
    <Card
      className={wrapper}
      variant="borderless"
      styles={{ body: { padding: '0.5rem 0' } }}
    >
      <div className={header}>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
          <p className="text-sm text-gray-500">{plan.sprint} · 负责人 {plan.owner}</p>
        </div>
        <Button
          icon={<LineChartOutlined />}
          type="primary"
          onClick={() => onNavigateReport?.(plan.id)}
        >
          查看报告
        </Button>
      </div>

      <div className={metrics}>
        <Statistic title="覆盖率" value={Math.round(plan.coverage * 100)} suffix="%" />
        <Statistic title="用例数" value={plan.cases.length || 0} />
        <Statistic title="当前里程碑" value={plan.milestones.at(-1)?.title ?? '规划中'} />
      </div>

      <Divider className="my-2" />

      <div className={timeline}>
        <div>开始：{formatDate(plan.startDate, 'YYYY-MM-DD')}</div>
        <div>结束：{formatDate(plan.endDate, 'YYYY-MM-DD')}</div>
        <Progress percent={Math.round(plan.coverage * 100)} showInfo={false} strokeColor="#1677ff" />
      </div>
    </Card>
  )
}

export default TestPlanPanel
