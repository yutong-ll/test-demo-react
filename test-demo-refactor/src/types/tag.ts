export interface ComponentNode {
  id: string
  label: string
  type: 'module' | 'component' | 'feature'
  children?: ComponentNode[]
}

export interface TagMeta {
  id: string
  name: string
  usage: number
  color: string
}
