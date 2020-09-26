import { differenceInDays, getHours, getISODay, startOfDay } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

export const isForTomorrowNight = (date: Date): boolean => {
  const hours = getHours(date)
  return hours >= 20
}
export const isForTomorrowDay = (date: Date): boolean => {
  const hours = getHours(date)
  return hours >= 20
}
export const isForTodayDay = (date: Date): boolean => {
  const hours = getHours(date)
  return hours <= 14
}
export const isForTodayEvening = (date: Date): boolean => {
  const hours = getHours(date)
  return hours > 14 && hours < 20
}

export const isForWeekend = (date: Date): boolean => {
  const day = getISODay(date)
  const hours = getHours(date)
  return (day === 5 && hours >= 16) || (day === 6 && hours <= 16)
}

export const isCurrentWeekend = (date: Date, currentDate: Date): boolean => {
  const day = getISODay(date)
  return (day === 6 || day === 7) && Math.abs(differenceInDays(date, currentDate)) <= 3
}
export const isTomorrowNight = (date: Date, currentDate: Date): boolean => {
  const hours = getHours(date)
  const isTomorrowDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 1
  const isNightTime = hours <= 8
  return isTomorrowDay && isNightTime
}
export const isTomorrowDay = (date: Date, currentDate: Date): boolean => {
  const hours = getHours(date)
  const isTomorrowDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 1
  const isDayTime = hours >= 8 && hours <= 20
  return isTomorrowDay && isDayTime
}
export const isTodayDay = (date: Date, currentDate: Date): boolean => {
  const hours = getHours(date)
  const isTodayDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 0
  const isDayTime = hours >= 9 && hours <= 20
  return isTodayDay && isDayTime
}
export const isTodayEvening = (date: Date, currentDate: Date): boolean => {
  const hours = getHours(date)
  const isTodayDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 0
  const isTomorrowDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 1
  const isEveningTime = hours >= 20
  const isNightTime = hours <= 2
  return (isTodayDay && isEveningTime) || (isTomorrowDay && isNightTime)
}

// https://openweathermap.org/weather-conditions

export const LIGHT_RAIN_CODES = [500, 501, 520, 521, 302, 310, 311, 312, 313, 321]
export const HEAVY_RAIN_CODES = [502, 503, 504, 511, 522, 531, 314]
export const THUNDERSTORM_CODES = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]

export const SNOW_CODES = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]

export const LIGHT_SNOW_CODES = [600, 601, 611, 612, 615, 616, 620, 621]
export const HEAVY_SNOW_CODES = [602, 613, 622]

export const CLEAR_SKY_CODES = [800, 801, 802]

export const MEDIUM_HUMIDITY = 70

export const MEDIUM_WIND = 10
export const HARD_WIND = 20

export const isIncludesCodes = (data: any[], codes: number[]): boolean =>
  data.filter((currentData: any) => currentData.weather.filter((w: any) => codes.includes(w.id)).length > 0).length > 0

export const getTemperature = (data: any): number => {
  if (typeof data.temp === 'number') {
    return data.temp
  } else {
    return data.temp.day
  }
}

export const getAverageTemperature = (data: any[]): number => {
  const temps = data.map(getTemperature)
  return temps.reduce((acc, temp) => acc + temp, 0) / temps.length
}

export const getMessagesByFilter = (deriveMessagesFn: (data: any[], period: string) => string[]) => (
  data: any[],
  filterFn: (givenDate: Date, currentDate: Date) => boolean,
  period: string,
  currentDate: Date,
  timezone: string
): string[] => {
  const filteredData: any[] = data.filter((currentData: any) => {
    const givenDate = utcToZonedTime(currentData.dt * 1000, timezone)
    return filterFn(givenDate, currentDate)
  })
  return deriveMessagesFn(filteredData, period)
}
