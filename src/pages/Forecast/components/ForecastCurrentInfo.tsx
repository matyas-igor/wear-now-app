import * as React from 'react'
import { Text, Box, Flex, FlexProps, BoxProps } from 'rebass/styled-components'
import { printDate } from '../../../helpers/date'

type Props = {
  dataCurrent: any
  timezone: string
}

const ForecastCurrentInfo: React.FC<Props & BoxProps> = ({ dataCurrent, timezone, ...props }) => (
  <Box sx={{ flexGrow: 1 }} {...props}>
    <Flex width="100%" m={-2} flexWrap="wrap" flexDirection="row">
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#999'}>
          Sunrise
        </Text>
        <Text>{printDate(dataCurrent.sunrise * 1000, 'HH:mm', timezone)}</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Sunset
        </Text>
        <Text>{printDate(dataCurrent.sunset * 1000, 'HH:mm', timezone)}</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Humidity
        </Text>
        <Text>{dataCurrent.humidity}%</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Wind
        </Text>
        <Text>{dataCurrent.wind_speed > 0 ? dataCurrent.wind_speed.toFixed(1) : 0} m/s</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Visibility
        </Text>
        <Text>{(dataCurrent.visibility / 1000).toFixed(1)} km</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          UV index
        </Text>
        <Text>{dataCurrent.uvi}</Text>
      </Box>
    </Flex>
  </Box>
)

export default ForecastCurrentInfo
