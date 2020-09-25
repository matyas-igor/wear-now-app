import * as React from 'react'
import { Flex, Text } from 'rebass/styled-components'
import WeatherIcon from '../../../components/WeatherIcon'
import { printDate } from '../../../helpers/date'

type Props = {
  label?: string
  timezone: string
  data: any
}

const ForecastHourlyDataItem: React.FC<Props> = ({ label, data, timezone }) => (
  <Flex flexDirection="column" alignItems="center" width={60} flexShrink={0} flexGrow={0}>
    <Text textAlign="center" mb={1}>
      {label || printDate(data.dt * 1000, 'H', timezone)}
    </Text>
    <WeatherIcon name={data.weather[0].icon} size={['24px', null, '28px', null, '32px']} />
    <Text textAlign="center" mt={1}>
      {Math.round(data.temp)}°
    </Text>
  </Flex>
)

export default ForecastHourlyDataItem
