import { useState } from 'react'
import { reportPageClasses } from './style'
import HeaderSection from './components/HeaderSection'
import FilterCard from './components/FilterCard'
import StatCard from './components/StatCard'
import EvaluationCard from './components/EvaluationCard'
import ExecutionStatusCard from './components/ExecutionStatusCard'
import ComponentProgressCard from './components/ComponentProgressCard'
import QualityRadarCard from './components/QualityRadarCard'
import AutomationCoverageCard from './components/AutomationCoverageCard'
import PipelineRunsCard from './components/PipelineRunsCard'
import ExportModal from './components/ExportModal'
import {
  automationCoverageMetrics,
  componentProgressRows,
  evaluationSummary,
  executionStats,
  executionStatusDistribution,
  exportFormatOptions,
  pipelineRuns,
  planOptions,
  radarMetrics,
  reportMeta,
} from './mock'
import './utils/registerCharts'

const TestReportPage: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(planOptions[0]?.value ?? null)
  const [exportModalOpen, setExportModalOpen] = useState(false)

  return (
    <div className={reportPageClasses.page}>
      <HeaderSection onExport={() => setExportModalOpen(true)} />
      <FilterCard planOptions={planOptions} selectedPlan={selectedPlan} onPlanChange={setSelectedPlan} lastUpdated={reportMeta.lastUpdated} />

      <div className={reportPageClasses.kpiGrid}>
        {executionStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      <div className={reportPageClasses.chartRow}>
        <EvaluationCard summary={evaluationSummary} />
        <ExecutionStatusCard distribution={executionStatusDistribution} />
      </div>

      <div className={reportPageClasses.tableRow}>
        <ComponentProgressCard data={componentProgressRows} />
        <QualityRadarCard metrics={radarMetrics} />
      </div>

      <div className={reportPageClasses.automationRow}>
        <AutomationCoverageCard metrics={automationCoverageMetrics} />
        <PipelineRunsCard runs={pipelineRuns} />
      </div>

      <ExportModal open={exportModalOpen} options={exportFormatOptions} onClose={() => setExportModalOpen(false)} />
    </div>
  )
}

export default TestReportPage
