import { utcToZonedTime } from 'date-fns-tz'
import {
  CLEAR_SKY_CODES, getMessagesByFilter,
  HARD_WIND,
  HEAVY_RAIN_CODES,
  isCurrentWeekend,
  isForTodayDay,
  isForTodayEvening,
  isForTomorrowNight,
  isForWeekend,
  isIncludesCodes,
  isTodayDay,
  isTodayEvening,
  isTomorrowNight,
  LIGHT_RAIN_CODES,
  MEDIUM_HUMIDITY,
  MEDIUM_WIND,
  SNOW_CODES,
  THUNDERSTORM_CODES,
} from './weather'

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

const getPlantMessagesByFilter: (
  data: any[],
  filterFn: (givenDate: Date, currentDate: Date) => boolean,
  period: string,
  currentDate: Date,
  timezone: string
) => string[] = getMessagesByFilter(derivePlantMessages)

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
