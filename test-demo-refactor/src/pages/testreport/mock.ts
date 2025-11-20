import { createElement } from 'react'
import { BugOutlined, CheckCircleOutlined, CloseCircleOutlined, ExperimentOutlined, RocketOutlined } from '@ant-design/icons'
import type {
  AutomationCoverageMetric,
  ComponentProgressNode,
  EvaluationSummary,
  ExecutionStat,
  ExecutionStatusDistribution,
  PipelineRun,
  RadarMetric,
  ReportExportOption,
  ReportMeta,
  ReportPlanOption,
} from './interface'

export const planOptions: ReportPlanOption[] = [
  { value: 'plan-1', label: 'E-Commerce Platform (Q4 Release)' },
  { value: 'plan-2', label: 'Mobile Application V2' },
]

export const reportMeta: ReportMeta = {
  lastUpdated: '10 mins ago',
}

export const exportFormatOptions: ReportExportOption[] = [
  { value: 'pdf', label: 'PDF Document (.pdf)' },
  { value: 'excel', label: 'Excel Spreadsheet (.xlsx)' },
]

export const executionStats: ExecutionStat[] = [
  { title: 'Execution Rate', value: '94%', subtitle: '120/128 Executed', icon: createElement(RocketOutlined), color: '#1677ff', bg: '#e6f4ff' },
  { title: 'Total Cases', value: '128', subtitle: 'Scope Coverage', icon: createElement(ExperimentOutlined), color: '#722ed1', bg: '#f9f0ff' },
  { title: 'Passed', value: '96', subtitle: '75% Pass Rate', icon: createElement(CheckCircleOutlined), color: '#52c41a', bg: '#f6ffed' },
  { title: 'Failed', value: '16', subtitle: 'Needs Attention', icon: createElement(CloseCircleOutlined), color: '#ff4d4f', bg: '#fff1f0' },
  { title: 'Bugs Found', value: '16', subtitle: '2 Critical, 14 High', icon: createElement(BugOutlined), color: '#faad14', bg: '#fffbe6' },
]

export const evaluationSummary: EvaluationSummary = {
  averageScore: 4.2,
  totalReviews: 3,
  reviews: [
    {
      id: 1,
      reviewer: 'QA Lead (Alice)',
      avatarColor: '#1677ff',
      stars: 4,
      date: '2023-10-27',
      comment: 'Regression testing was thorough. Payment module is stable, but Login API had some latency issues.',
    },
    {
      id: 2,
      reviewer: 'Dev Manager (Bob)',
      avatarColor: '#f56a00',
      stars: 5,
      date: '2023-10-28',
      comment: 'Great coverage on the new features. The critical bugs were found early.',
    },
    {
      id: 3,
      reviewer: 'Product Owner (Carol)',
      avatarColor: '#87d068',
      stars: 3.5,
      date: '2023-10-28',
      comment: "Coverage is good, but manual testing took longer than expected. Let's increase automation.",
    },
  ],
}

export const executionStatusDistribution: ExecutionStatusDistribution = {
  segments: [
    { label: 'Passed', value: 96, color: '#52c41a' },
    { label: 'Failed', value: 16, color: '#ff4d4f' },
    { label: 'Blocked', value: 8, color: '#faad14' },
    { label: 'Not Run', value: 8, color: '#f0f0f0' },
  ],
  donePercent: 94,
  centerLabel: 'Done',
}

export const componentProgressRows: ComponentProgressNode[] = [
  {
    key: 'user-auth',
    name: 'User Authentication',
    total: 29,
    passed: 25,
    failed: 4,
    passRate: 85,
    bugs: 4,
    children: [
      { key: 'login', name: 'Login Functionality', total: 15, passed: 14, failed: 1, passRate: 93, bugs: 1, status: 'Good' },
      { key: 'registration', name: 'Registration', total: 14, passed: 11, failed: 3, passRate: 79, bugs: 3, status: 'Attention' },
    ],
  },
  {
    key: 'payment',
    name: 'Payment Processing',
    total: 39,
    passed: 24,
    failed: 15,
    passRate: 62,
    bugs: 8,
    children: [
      { key: 'gateway', name: 'Payment Gateway', total: 20, passed: 10, failed: 10, passRate: 50, bugs: 6, status: 'Critical' },
      { key: 'mobile-checkout', name: 'Mobile Checkout', total: 19, passed: 14, failed: 5, passRate: 74, bugs: 2, status: 'Attention' },
    ],
  },
]

export const radarMetrics: RadarMetric[] = [
  { label: 'Stability', current: 4.1, previous: 3.8 },
  { label: 'Performance', current: 3.3, previous: 3.5 },
  { label: 'UX', current: 3.9, previous: 3.2 },
  { label: 'Security', current: 3.5, previous: 3.4 },
  { label: 'Maintainability', current: 3.7, previous: 3.3 },
]

export const automationCoverageMetrics: AutomationCoverageMetric[] = [
  { label: 'User Auth', automated: 85, manual: 15 },
  { label: 'Product Catalog', automated: 90, manual: 10 },
  { label: 'Payment', automated: 70, manual: 30 },
  { label: 'Shopping Cart', automated: 75, manual: 25 },
]

export const pipelineRuns: PipelineRun[] = [
  {
    id: 'Main Pipeline #245',
    status: 'Success',
    passed: 456,
    failed: 12,
    duration: '12m 45s',
    build: 'v2.3.1-build.4',
    time: '2023-06-15 14:32:18',
  },
  {
    id: 'Main Pipeline #244',
    status: 'Failed',
    passed: 421,
    failed: 47,
    duration: '8m 22s',
    build: 'v2.3.1-build.3',
    time: '2023-06-15 10:15:33',
  },
  {
    id: 'Feature Pipeline #132',
    status: 'Success',
    passed: 218,
    failed: 3,
    duration: '5m 18s',
    build: 'feature/dashboard-build.8',
    time: '2023-06-14 16:48:22',
  },
]

export const exportModalDescription = 'Select the format and sections you wish to include in your report.'


