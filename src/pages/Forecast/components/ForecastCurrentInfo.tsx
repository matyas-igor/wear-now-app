import * as React from 'react'
import { Text, Box, Flex, FlexProps, BoxProps } from 'rebass/styled-components'

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
        <Text>08:45</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Sunset
        </Text>
        <Text>19:45</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Humidity
        </Text>
        <Text>60%</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Wind
        </Text>
        <Text>4 m/s</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          Visibility
        </Text>
        <Text>10,3 km</Text>
      </Box>
      <Box width={[1 / 3, 1 / 2, 1 / 3, 1 / 4]} p={2}>
        <Text fontSize={1} mb={1} color={'#aaa'}>
          UV index
        </Text>
        <Text>3</Text>
      </Box>
    </Flex>
  </Box>
)

export default ForecastCurrentInfo
