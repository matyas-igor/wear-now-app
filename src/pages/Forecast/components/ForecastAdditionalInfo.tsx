import * as React from 'react'
import Container, { ContainerProps } from '../../../components/Container'
import ForecastDailyInfo from './ForecastDailyInfo'
import ForecastCurrentInfo from './ForecastCurrentInfo'
import { Flex } from 'rebass/styled-components'

type Props = {
  dataCurrent: any
  dataDaily: any[]
  timezone: string
}

const ForecastAdditionalInfo: React.FC<Props & ContainerProps> = ({ dataCurrent, dataDaily, timezone, ...props }) => (
  <Container {...props}>
    <Flex
      width="100%"
      flexDirection={['column', 'row']}
      justifyContent="flex-start"
      alignItems={['stretch', 'flex-start']}
    >
      <ForecastCurrentInfo mb={[4, 0]} dataCurrent={dataCurrent} timezone={timezone} />
      <ForecastDailyInfo dataDaily={dataDaily} timezone={timezone} />
    </Flex>
  </Container>
)

export default ForecastAdditionalInfo
