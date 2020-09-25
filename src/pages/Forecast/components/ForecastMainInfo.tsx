import * as React from 'react'
import { Flex, Heading, Text } from 'rebass/styled-components'
import WeatherIcon from '../../../components/WeatherIcon'
import Container, { ContainerProps } from '../../../components/Container'
import { City } from '../../../helpers/types'

type Props = {
  dataCurrent: any
  city: City
  timezone: string
}

const ForecastMainInfo: React.FC<Props & ContainerProps> = ({ city, dataCurrent, timezone, ...props }) => (
  <Container {...props}>
    <Heading fontSize={[5, 6, 7]}>
      It’s {dataCurrent.weather[0].description} now in {city.city}
    </Heading>
    <Flex flexDirection="row" justifyContent="flex-start" alignItems="flex-start">
      <Text fontWeight="bold" fontSize={[10, null, 11]} lineHeight="1em">
        {Math.round(dataCurrent.temp)}°
      </Text>
      <WeatherIcon name={dataCurrent.weather[0].icon} size={[96, null, 108, 120]} />
    </Flex>
  </Container>
)

export default ForecastMainInfo
