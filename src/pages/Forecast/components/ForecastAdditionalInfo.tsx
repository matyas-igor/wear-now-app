import * as React from 'react'
import Container, { ContainerProps } from '../../../components/Container'
import ForecastDailyInfo from './ForecastDailyInfo'

type Props = {
  dataCurrent: any
  dataDaily: any[]
  timezone: string
}

const ForecastAdditionalInfo: React.FC<Props & ContainerProps> = ({ dataCurrent, dataDaily, timezone, ...props }) => (
  <Container {...props}>
    <ForecastDailyInfo dataDaily={dataDaily} timezone={timezone} />
  </Container>
)

export default ForecastAdditionalInfo
