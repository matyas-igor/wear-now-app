import * as React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import Spinner from '../../../components/Spinner'
import HomeCityListItem from './HomeCityListItem'

type Props = {
  select: (city: any) => void
  cities: any[]
  loading: boolean
  error: Error | null
  message: string | null
}

const HomeCityList: React.FC<Props> = ({ select, cities, loading, error, message }) => (
  <Box width="100%" mb={5} minHeight={80}>
    {loading ? (
      <Flex width="100%" height={80} flexDirection="column" justifyContent="center" alignItems="center">
        <Spinner />
      </Flex>
    ) : cities && cities.length > 0 ? (
      cities.map((city, idx) => <HomeCityListItem onClick={() => select(city)} key={idx} city={city} />)
    ) : message || error ? (
      <Flex width="100%" minHeight={80} flexDirection="column" justifyContent="center" alignItems="stretch">
        <Text fontSize={[2, null, 3]} color="red">
          {message || error?.message}
        </Text>
      </Flex>
    ) : (
      <Flex width="100%" minHeight={80} flexDirection="column" justifyContent="center" alignItems="stretch">
        <Text fontSize={[2, null, 3]} color="gray">
          List of cities will be displayed here
        </Text>
      </Flex>
    )}
  </Box>
)

export default HomeCityList
