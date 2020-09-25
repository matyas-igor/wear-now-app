import * as React from 'react'
import { Flex, FlexProps, Box, BoxProps, Text } from 'rebass/styled-components'
import styled from 'styled-components'
import { printDate } from '../../../helpers/date'
import WeatherIcon from '../../../components/WeatherIcon'

type Props = {
  dataDaily: any[]
  timezone: string
}

const StyledFlex = styled(Flex)<FlexProps>`
  box-sizing: border-box;
  border-bottom: 1px solid #dddddf;
  &:last-of-type {
    border-bottom: 0 !important;
  }
  &:hover {
    background-color: #f6f6f9;
  }
`

const ForecastDailyInfo: React.FC<Props & BoxProps> = ({ dataDaily, timezone, ...props }) => (
  <Box {...props}>
    {dataDaily.map((dailyData, idx) => (
      <StyledFlex key={idx} width="100%" flexDirection="row" px={[2, null, 3]} py={1} alignItems={'center'}>
        <Text sx={{ flexGrow: 1 }}>{printDate(dailyData.dt * 1000, 'EEEE', timezone)}</Text>
        <WeatherIcon name={dailyData.weather[0].icon} size={['24px', null, '28px', null, '32px']} />
        <Text textAlign="right" width={[40, null, 48]}>
          {Math.round(dailyData.temp.max)}°
        </Text>
        <Text textAlign="right" width={[40, null, 48]} color="gray">
          {Math.round(dailyData.temp.min)}°
        </Text>
      </StyledFlex>
    ))}
  </Box>
)

export default ForecastDailyInfo
