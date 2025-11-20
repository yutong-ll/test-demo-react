import { Card, Progress, Statistic } from 'antd'
import type { TestReport } from '@/types/testreport'
import { formatDate, formatPercent } from '@/utils/format'

interface ReportSummaryProps {
  report: TestReport
}

const ReportSummary: React.FC<ReportSummaryProps> = ({ report }) => (
  <Card className="card-surface" variant="borderless" title={`报告 ${report.id}`}>
    <p className="text-sm text-gray-500">生成时间：{formatDate(report.generatedAt)}</p>
    <p className="mt-2 text-gray-700">{report.summary}</p>

    <div className="grid grid-cols-2 gap-4 mt-4">
      <Statistic title="通过率" value={Math.round(report.passRate * 100)} suffix="%" />
      <Statistic title="回归率" value={Math.round(report.regressionRate * 100)} suffix="%" />
    </div>

    <div className="mt-4 space-y-3">
      {report.trend.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between text-xs text-gray-500">
            <span>{item.label}</span>
            <span>通过率 {formatPercent(item.passRate)}</span>
          </div>
          <Progress percent={Math.round(item.passRate * 100)} showInfo={false} strokeColor="#13c2c2" />
        </div>
      ))}
    </div>
  </Card>
)

export default ReportSummary
