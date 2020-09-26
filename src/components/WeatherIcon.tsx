import * as React from 'react'

import Icon, { IconProps } from './Icon'

import { ReactComponent as wiDaySunny } from '../icons/wi-day-sunny.svg'
import { ReactComponent as wiNightClear } from '../icons/wi-night-clear.svg'
import { ReactComponent as wiDayCloudy } from '../icons/wi-day-cloudy.svg'
import { ReactComponent as wiNightCloudy } from '../icons/wi-night-cloudy.svg'
import { ReactComponent as wiDayCloudyHigh } from '../icons/wi-day-cloudy-high.svg'
import { ReactComponent as wiNightCloudyHigh } from '../icons/wi-night-cloudy-high.svg'
import { ReactComponent as wiDaySunnyOvercast } from '../icons/wi-day-sunny-overcast.svg'
import { ReactComponent as wiNightPartlyCloudy } from '../icons/wi-night-alt-partly-cloudy.svg'
import { ReactComponent as wiDayShowers } from '../icons/wi-day-showers.svg'
import { ReactComponent as wiNightShowers } from '../icons/wi-night-showers.svg'
import { ReactComponent as wiDayRain } from '../icons/wi-day-rain.svg'
import { ReactComponent as wiNightRain } from '../icons/wi-night-rain.svg'
import { ReactComponent as wiDayThunderstorm } from '../icons/wi-day-thunderstorm.svg'
import { ReactComponent as wiNightThunderstorm } from '../icons/wi-night-thunderstorm.svg'
import { ReactComponent as wiDaySnow } from '../icons/wi-day-snow.svg'
import { ReactComponent as wiNightSnow } from '../icons/wi-night-snow.svg'
import { ReactComponent as wiDayRainMix } from '../icons/wi-day-rain-mix.svg'
import { ReactComponent as wiNightRainMix } from '../icons/wi-night-rain-mix.svg'
import { ReactComponent as wiMeteor } from '../icons/wi-meteor.svg'

/**
 * Selects the name for an image
 * @param {string} name the name given to you by OpenWeatherMap
 * @returns {string} returns the string for the image
 */
const imageSelector = (name?: string) => {
  switch (name) {
    case '01d':
      return wiDaySunny
    case '01n':
      return wiNightClear
    case '02d':
      return wiDayCloudy
    case '02n':
      return wiNightCloudy
    case '03d':
      return wiDayCloudyHigh
    case '03n':
      return wiNightCloudyHigh
    case '04d':
      return wiDaySunnyOvercast
    case '04n':
      return wiNightPartlyCloudy
    case '09d':
      return wiDayShowers
    case '09n':
      return wiNightShowers
    case '10d':
      return wiDayRain
    case '10n':
      return wiNightRain
    case '11d':
      return wiDayThunderstorm
    case '11n':
      return wiNightThunderstorm
    case '13d':
      return wiDaySnow
    case '13n':
      return wiNightSnow
    case '50d':
      return wiDayRainMix
    case '50n':
      return wiNightRainMix
    default:
      return wiMeteor
  }
}

type Props = {
  name: string
}

const WeatherIcon: React.FC<Props & IconProps> = ({ name, color = '#000', ...props }) => {
  const SvgIcon = imageSelector(name)
  return (
    <Icon color={color} {...props}>
      <SvgIcon />
    </Icon>
  )
}

export default WeatherIcon
