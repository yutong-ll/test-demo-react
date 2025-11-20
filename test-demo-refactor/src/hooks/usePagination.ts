import { useCallback, useState } from 'react'

export interface PaginationState {
  current: number
  pageSize: number
  total: number
}

export interface UsePaginationOptions {
  initialPage?: number
  initialPageSize?: number
  total: number
}

export interface UsePaginationResult {
  pagination: PaginationState
  onChange: (page: number, pageSize?: number) => void
  setTotal: (total: number) => void
}

export const usePagination = ({
  initialPage = 1,
  initialPageSize = 10,
  total,
}: UsePaginationOptions): UsePaginationResult => {
  const [{ current, pageSize, total: totalCount }, setState] = useState<PaginationState>({
    current: initialPage,
    pageSize: initialPageSize,
    total,
  })

  const handleChange = useCallback((page: number, size = pageSize) => {
    setState((prev) => ({ ...prev, current: page, pageSize: size }))
  }, [pageSize])

  const setTotal = useCallback((value: number) => {
    setState((prev) => ({ ...prev, total: value }))
  }, [])

  return {
    pagination: { current, pageSize, total: totalCount },
    onChange: handleChange,
    setTotal,
  }
}
