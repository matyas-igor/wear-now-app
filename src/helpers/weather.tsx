import { utcToZonedTime } from 'date-fns-tz'
import { getISODay, getHours, differenceInDays, startOfDay } from 'date-fns'

const isForTomorrowNight = (date: Date) => {
  const hours = getHours(date)
  return hours >= 20
}
const isForTodayDay = (date: Date) => {
  const hours = getHours(date)
  return hours <= 14
}
const isForTodayEvening = (date: Date) => {
  const hours = getHours(date)
  return hours > 14 && hours < 20
}

const isForWeekend = (date: Date) => {
  const day = getISODay(date)
  const hours = getHours(date)
  return (day === 5 && hours >= 16) || (day === 6 && hours <= 16)
}

const isCurrentWeekend = (date: Date, currentDate: Date) => {
  const day = getISODay(date)
  return (day === 6 || day === 7) && Math.abs(differenceInDays(date, currentDate)) <= 3
}
const isTomorrowNight = (date: Date, currentDate: Date) => {
  const hours = getHours(date)
  const isTomorrowDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 1
  const isNightTime = hours <= 8
  return isTomorrowDay && isNightTime
}
const isTodayDay = (date: Date, currentDate: Date) => {
  const hours = getHours(date)
  const isTodayDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 0
  const isDayTime = hours >= 9 && hours <= 20
  return isTodayDay && isDayTime
}
const isTodayEvening = (date: Date, currentDate: Date) => {
  const hours = getHours(date)
  const isTodayDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 0
  const isTomorrowDay = differenceInDays(startOfDay(date), startOfDay(currentDate)) === 1
  const isEveningTime = hours >= 20
  const isNightTime = hours <= 2
  return (isTodayDay && isEveningTime) || (isTomorrowDay && isNightTime)
}

const LIGHT_RAIN_CODES = [500, 501, 520, 521, 302, 310, 311, 312, 313, 321]
const HEAVY_RAIN_CODES = [502, 503, 504, 511, 522, 531, 314]
const THUNDERSTORM_CODES = [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]

const SNOW_CODES = [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
const CLEAR_SKY_CODES = [800, 801, 802]

const MEDIUM_HUMIDITY = 70

const MEDIUM_WIND = 10
const HARD_WIND = 20

// https://openweathermap.org/weather-conditions

const isIncludesCodes = (data: any[], codes: number[]) =>
  data.filter((currentData: any) => currentData.weather.filter((w: any) => codes.includes(w.id)).length > 0).length > 0

const derivePlantMessages = (data: any[], period: string): string[] => {
  const messages = []
  let canStayOutside = true

  const isLightRainExpected = isIncludesCodes(data, LIGHT_RAIN_CODES)
  const isHeavyRainExpected = isIncludesCodes(data, HEAVY_RAIN_CODES)
  const isThunderstormExpected = isIncludesCodes(data, THUNDERSTORM_CODES)
  const isClearSkyExpected = isIncludesCodes(data, CLEAR_SKY_CODES)
  const isSnowExpected = isIncludesCodes(data, SNOW_CODES)
  const isHighHumidity = data.filter((dailyData: any) => dailyData.humidity < MEDIUM_HUMIDITY).length === 0

  const isMediumWind = data.filter((dailyData: any) => dailyData.wind_speed >= MEDIUM_WIND).length > 0
  const isHardWind = data.filter((dailyData: any) => dailyData.wind_speed >= HARD_WIND).length > 0

  // Calculate based on flags

  if (isThunderstormExpected) {
    messages.push(`Thunderstorms expected ${period}, put your plants inside!`)
    canStayOutside = false
  } else if (isHeavyRainExpected) {
    messages.push(`Heavy rain expected ${period}, consider putting your plants inside`)
    canStayOutside = false
  } else if (isLightRainExpected) {
    messages.push(`Light rain expected ${period}, plants should be enough hydrated`)
  } else if (!isClearSkyExpected && isHighHumidity) {
    messages.push(`No direct sun and high humidity expected ${period}, plants should be enough hydrated`)
  } else if (isSnowExpected) {
    messages.push(`Snowing expected ${period}, consider putting your plants inside`)
    canStayOutside = false
  } else {
    messages.push(`Warm weather and direct sun expected ${period}, consider watering your plants!`)
  }

  if (canStayOutside) {
    if (isHardWind) {
      messages.push(`Hard wind expected ${period}, better put your plants inside!`)
      canStayOutside = false
    } else if (isMediumWind) {
      messages.push(`Medium wind expected ${period}, consider putting your plants inside`)
      canStayOutside = false
    } else {
      messages.push(`No heavy wind expected ${period}, your plants can enjoy staying outside`)
    }
  }

  return messages
}

const getPlantMessagesByFilter = (
  data: any[],
  filterFn: (givenDate: Date, currentDate: Date) => boolean,
  period: string,
  currentDate: Date,
  timezone: string
): string[] => {
  const filteredData = data.filter((currentData: any) => {
    const givenDate = utcToZonedTime(currentData.dt * 1000, timezone)
    return filterFn(givenDate, currentDate)
  })
  return derivePlantMessages(filteredData, period)
}

export const getPlantMessages = (data: { timezone: string; current: any; daily: any[]; hourly: any[] }): string[] => {
  const date = utcToZonedTime(data.current.dt * 1000, data.timezone)

  if (isForWeekend(date)) {
    return getPlantMessagesByFilter(data.daily, isCurrentWeekend, 'over the weekend', date, data.timezone)
  } else if (isForTomorrowNight(date)) {
    return getPlantMessagesByFilter(data.hourly, isTomorrowNight, 'in the night', date, data.timezone)
  } else if (isForTodayDay(date)) {
    return getPlantMessagesByFilter(data.hourly, isTodayDay, 'today', date, data.timezone)
  } else if (isForTodayEvening(date)) {
    return getPlantMessagesByFilter(data.hourly, isTodayEvening, 'in the evening', date, data.timezone)
  }

  return []
}
