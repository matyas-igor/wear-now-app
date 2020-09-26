import { utcToZonedTime } from 'date-fns-tz'
import {
  CLEAR_SKY_CODES,
  getAverageTemperature,
  getMessagesByFilter,
  HEAVY_RAIN_CODES,
  HEAVY_SNOW_CODES,
  isForTodayDay,
  isForTodayEvening,
  isForTomorrowDay,
  isIncludesCodes,
  isTodayDay,
  isTodayEvening,
  isTomorrowDay,
  LIGHT_RAIN_CODES,
  LIGHT_SNOW_CODES,
  THUNDERSTORM_CODES,
} from './weather'

const deriveClothesMessages = (data: any[], period: string): string[] => {
  const messages = []

  const isLightRainExpected = isIncludesCodes(data, LIGHT_RAIN_CODES)
  const isHeavyRainExpected = isIncludesCodes(data, HEAVY_RAIN_CODES)
  const isThunderstormExpected = isIncludesCodes(data, THUNDERSTORM_CODES)
  const isClearSkyExpected = isIncludesCodes(data, CLEAR_SKY_CODES)
  const isLightSnowExpected = isIncludesCodes(data, LIGHT_SNOW_CODES)
  const isHeavySnowExpected = isIncludesCodes(data, HEAVY_SNOW_CODES)

  const temp = getAverageTemperature(data)

  // Calculate based on temperature
  if (temp >= 25) {
    // over 25
    messages.push(`Shorts and T-shirt weather expected ${period}!`)
    if (isLightRainExpected || isHeavyRainExpected) {
      messages.push(`Rain expected ${period}, don't forget an umbrella.`)
    }
    if (isThunderstormExpected) {
      messages.push(`Thunderstorm expected ${period}! Don't forget to take a rain jacket.`)
    }
    if (isClearSkyExpected) {
      messages.push(`It should be sunny ${period}, so a hat or sunglasses is a must.`)
    }
  } else if (temp >= 15) {
    // over 15 and below 25
    if (isLightRainExpected || isHeavyRainExpected) {
      messages.push(`It's going to be raining ${period}, so consider taking light rain jacket and umbrella.`)
    } else if (isThunderstormExpected) {
      messages.push(`It's going to be thunderstorm ${period}, so rain jacket and umbrella are a must!`)
    } else {
      messages.push(
        `There'll be a light breeze ${period}, so T-shirt with long sleeves or light jacket might be useful.`
      )
    }
    if (isClearSkyExpected) {
      messages.push(`It should be sunny ${period}, don't forget to take sunglasses or a hat.`)
    }
  } else if (temp >= 5) {
    // over 5 and below 15
    if (isLightRainExpected || isHeavyRainExpected) {
      messages.push(
        `It's going to be raining and cold ${period}, so consider taking a medium rain coat or thick jumper and umbrella.`
      )
    } else if (isThunderstormExpected) {
      messages.push(`It's going to be thunderstorm ${period} and cold, so heavy rain coat and umbrella are a must!`)
    } else {
      messages.push(`It's going to be cold ${period}, so coat or thick jumper might be sensible.`)
    }
    messages.push(`Consider taking a light beanie!`)
    if (isClearSkyExpected) {
      messages.push(`It will be sunny ${period}, consider taking sunglasses.`)
    }
  } else if (temp >= -5) {
    // over -5 and below 5
    if (isLightRainExpected || isLightSnowExpected) {
      messages.push(
        `It's going to be light rain or shower sleet and quite cold ${period}, so consider taking a medium coat and umbrella.`
      )
    } else if (isHeavyRainExpected || isHeavySnowExpected) {
      messages.push(
        `Heavy rain or sleet and quite cold expected ${period}, so consider taking a rainproof thick coat and umbrella.`
      )
    } else if (isThunderstormExpected) {
      messages.push(
        `It's going to be thunderstorm ${period} and quite cold, so rainproof thick coat and umbrella are a must!`
      )
    } else {
      messages.push(`It's going to be cold ${period}, so a medium coat might be sensible.`)
      messages.push(`Get proper boots and be aware of ice-crusted ground!`)
    }
    messages.push(`Consider taking light scarf and a beanie!`)
  } else if (temp >= -15) {
    // over -15 and below -5
    if (isLightSnowExpected || isHeavySnowExpected) {
      messages.push(
        `It's going to be snowing ${period} and very cold, so consider taking heavy coat and don't forget about gloves.`
      )
    } else if (isThunderstormExpected) {
      messages.push(`It's going to be thunderstorm ${period} and very cold, so heavy coat is a must!`)
    } else {
      messages.push(`It's going to be freezing without snow ${period}, take a heavy coat!`)
    }
    messages.push(`Don't forget about scarf and a beanie!`)
  } else {
    // below -15
    if (isLightSnowExpected || isHeavySnowExpected) {
      messages.push(
        `It's going to be snowing ${period} and super cold, so consider taking heavy winter coat and don't forget about gloves.`
      )
    } else if (isThunderstormExpected) {
      messages.push(
        `It's going to be thunderstorm ${period} and super cold, so heavy winter coat and warm underwear are a must!`
      )
    } else {
      messages.push(
        `It's going to be super freezing without snow ${period}, so must take a heavy winter coat and warm underwear.`
      )
    }
    messages.push(`Don't forget about warm scarf and a beanie!`)
  }

  return messages
}

const getClothesMessagesByFilter: (
  data: any[],
  filterFn: (givenDate: Date, currentDate: Date) => boolean,
  period: string,
  currentDate: Date,
  timezone: string
) => string[] = getMessagesByFilter(deriveClothesMessages)

export const getClothesMessages = (data: { timezone: string; current: any; daily: any[]; hourly: any[] }): string[] => {
  const date = utcToZonedTime(data.current.dt * 1000, data.timezone)

  if (isForTomorrowDay(date)) {
    return getClothesMessagesByFilter(data.hourly, isTomorrowDay, 'tomorrow', date, data.timezone)
  } else if (isForTodayDay(date)) {
    return getClothesMessagesByFilter(data.hourly, isTodayDay, 'today', date, data.timezone)
  } else if (isForTodayEvening(date)) {
    return getClothesMessagesByFilter(data.hourly, isTodayEvening, 'in the evening', date, data.timezone)
  }

  return []
}
