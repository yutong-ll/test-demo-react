import type { ReactNode } from 'react'

export type Timeframe = 'weekly' | 'monthly' | 'yearly'

export interface TimeframeOption {
  label: string
  value: Timeframe
}

export interface StatCard {
  id: string
  title: string
  value: string
  icon: ReactNode
  trend: string
  type: 'success' | 'danger' | 'info'
}

export interface ActivityItem {
  name: string
  action: string
  time: string
  icon: ReactNode
  color: 'processing' | 'success' | 'error' | 'warning'
}

export interface ProgressProject {
  name: string
  value: number
  color: 'blue' | 'cyan' | 'orange' | 'green'
}

export interface StatusBreakdownItem {
  label: string
  value: number
  color: string
}

export interface DeadlineItem {
  name: string
  color: 'orange' | 'red'
  time: string
}
