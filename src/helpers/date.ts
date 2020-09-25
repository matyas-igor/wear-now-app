import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const printDate = (milliseconds: number, pattern: string, timezone: string): string => {
  const date = utcToZonedTime(milliseconds, timezone)
  return format(date, pattern)
}
