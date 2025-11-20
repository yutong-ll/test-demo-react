import { useMemo } from 'react'
import type { TestCase } from '@/types/testcase'
import type { TestPlan } from '@/types/testplan'
import type { TestReport } from '@/types/testreport'
import type { ComponentNode, TagMeta } from '@/types/tag'

interface TestDataHookResult {
  testCases: TestCase[]
  testPlans: TestPlan[]
  testReports: TestReport[]
  tags: TagMeta[]
  componentTree: ComponentNode[]
}

export const useTestData = (): TestDataHookResult =>
  useMemo(() => {
    const sampleCases: TestCase[] = [
      {
        id: 'TC-001',
        title: '登录成功流程',
        priority: 'P0',
        owner: 'Zhang Wei',
        lastRunAt: '2025-11-18T09:00:00Z',
        status: 'pass',
        tags: ['auth', 'critical'],
        steps: [
          { id: 'S1', action: '输入账号密码', expected: '允许点击登录' },
          { id: 'S2', action: '点击登录按钮', expected: '跳转至首页' },
        ],
      },
      {
        id: 'TC-014',
        title: '权限不足提示',
        priority: 'P1',
        owner: 'Li Na',
        lastRunAt: '2025-11-17T11:30:00Z',
        status: 'fail',
        tags: ['permission'],
        steps: [{ id: 'S1', action: '访问管理页面', expected: '展示权限不足提示' }],
      },
      {
        id: 'TC-023',
        title: '移动端适配检查',
        priority: 'P2',
        owner: 'Chen Yu',
        lastRunAt: '2025-11-15T10:00:00Z',
        status: 'pending',
        tags: ['ui'],
        steps: [{ id: 'S1', action: '切换到移动端视图', expected: '布局保持稳定' }],
      },
    ]

    const plans: TestPlan[] = [
      {
        id: 'TP-2025-Q4',
        name: 'Q4 版本回归计划',
        owner: 'Wang Qi',
        sprint: 'Sprint 34',
        startDate: '2025-11-10',
        endDate: '2025-12-01',
        coverage: 0.82,
        cases: sampleCases,
        milestones: [
          { id: 'M1', title: '版本封板', date: '2025-11-20' },
          { id: 'M2', title: '回归结束', date: '2025-11-30' },
        ],
      },
    ]

    const reports: TestReport[] = [
      {
        id: 'TR-1118',
        planId: 'TP-2025-Q4',
        generatedAt: '2025-11-18T12:00:00Z',
        author: 'Qiao Ming',
        summary: '关键业务回归通过率 95%，核心缺陷 2 个待验证',
        passRate: 0.95,
        regressionRate: 0.08,
        trend: [
          { id: 'trend-1', label: 'Mon', passRate: 0.9, regression: 0.1 },
          { id: 'trend-2', label: 'Tue', passRate: 0.92, regression: 0.08 },
          { id: 'trend-3', label: 'Wed', passRate: 0.95, regression: 0.05 },
        ],
      },
    ]

    const tagItems: TagMeta[] = [
      { id: 'tag-auth', name: 'Auth', usage: 24, color: 'cyan' },
      { id: 'tag-critical', name: 'Critical', usage: 12, color: 'red' },
      { id: 'tag-ui', name: 'UI', usage: 30, color: 'blue' },
    ]

    const componentNodes: ComponentNode[] = [
      {
        id: 'module-core',
        label: '核心模块',
        type: 'module',
        children: [
          {
            id: 'component-auth',
            label: '认证组件',
            type: 'component',
            children: [
              { id: 'feature-login', label: '登录表单', type: 'feature' },
              { id: 'feature-mfa', label: '多因子验证', type: 'feature' },
            ],
          },
          {
            id: 'component-report',
            label: '报告组件',
            type: 'component',
            children: [{ id: 'feature-export', label: '报告导出', type: 'feature' }],
          },
        ],
      },
    ]

    return {
      testCases: sampleCases,
      testPlans: plans,
      testReports: reports,
      tags: tagItems,
      componentTree: componentNodes,
    }
  }, [])
