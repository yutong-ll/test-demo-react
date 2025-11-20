import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const formatDate = (value: string | Date, format = 'YYYY-MM-DD HH:mm') =>
  dayjs(value).format(format)

export const formatPercent = (value: number, fractionDigits = 0) =>
  `${(value * 100).toFixed(fractionDigits)}%`

export const formatDuration = (start: string, end: string) => {
  const startDate = dayjs(start)
  const endDate = dayjs(end)
  return endDate.from(startDate, true)
}
