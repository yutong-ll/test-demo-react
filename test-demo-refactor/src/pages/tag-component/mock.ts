import type { ComponentRecord, TagRecord } from './interface'

export const initialTags: TagRecord[] = [
  { id: 'tag-1', name: 'Smoke', type: 'tag', createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z' },
  { id: 'tag-2', name: 'Regression', type: 'tag', createdAt: '2024-02-10T09:30:00Z', updatedAt: '2024-02-10T09:30:00Z' },
  { id: 'tag-3', name: 'Performance', type: 'tag', createdAt: '2024-03-15T12:00:00Z', updatedAt: '2024-03-15T12:00:00Z' },
]

export const initialComponents: ComponentRecord[] = [
  {
    id: 'component-1',
    name: 'Authentication Service',
    description: 'Handles login, sign-up and password flows',
    status: 'Active',
    type: 'component',
    createdAt: '2024-01-05T08:00:00Z',
    updatedAt: '2024-03-01T08:00:00Z',
  },
  {
    id: 'component-2',
    name: 'Checkout Flow',
    description: 'Manages the checkout funnel from cart to payment',
    status: 'Maintenance',
    type: 'component',
    createdAt: '2024-02-18T10:45:00Z',
    updatedAt: '2024-04-10T10:45:00Z',
  },
  {
    id: 'component-3',
    name: 'Notification Center',
    description: 'Centralized messaging module for alerts',
    status: 'Inactive',
    type: 'component',
    createdAt: '2024-03-21T14:15:00Z',
    updatedAt: '2024-05-02T14:15:00Z',
  },
]
