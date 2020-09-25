import * as React from 'react'
import { Flex } from 'rebass/styled-components'
import Container, { ContainerProps } from '../../../components/Container'
import ForecastHourlyDataItem from './ForecastHourlyDataItem'
import ScrollContainer from 'react-indiana-drag-scroll'

type Props = {
  dataCurrent: any
  dataHourly: any[]
  timezone: string
}

const ForecastHourlyInfo: React.FC<Props & ContainerProps> = ({ dataCurrent, dataHourly, timezone, ...props }) => (
  <Container {...props}>
    <ScrollContainer horizontal vertical={false} hideScrollbars>
      <Flex flexDirection="row" flexWrap="nowrap">
        <ForecastHourlyDataItem label="Now" data={dataCurrent} timezone={timezone} />
        {dataHourly.map((hourlyData: any, idx: number) => (
          <ForecastHourlyDataItem key={idx} data={hourlyData} timezone={timezone} />
        ))}
      </Flex>
    </ScrollContainer>
  </Container>
)

export default ForecastHourlyInfo
