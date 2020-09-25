import * as React from 'react'
import { Input, Label } from '@rebass/forms/styled-components'
import { Box, Button, Flex } from 'rebass/styled-components'
import Form from '../../../components/Form'
import { useState } from 'react'

type Props = {
  search: (cityName?: string | null) => void
  loading: boolean
}

const HomeCitySearchForm: React.FC<Props> = ({ search, loading }) => {
  const [cityName, setCityName] = useState('')
  return (
    <Form
      mt={5}
      mb={4}
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        search(cityName)
      }}
    >
      <Label htmlFor="city" mb={[3, null, 4]} fontWeight="bold" fontSize={[32, null, 52, 64]}>
        Please select a city to show weather in
      </Label>
      <Flex width="100%" alignItems={'center'}>
        <Flex flexGrow={1}>
          <Input
            id="city"
            type="text"
            placeholder="Enter city name…"
            fontSize={[3, null, 4]}
            p={[2, null, 3]}
            value={cityName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCityName(e.target.value)}
            disabled={loading}
          />
        </Flex>
        <Box width={[80, null, 100, 120]} ml={[1, 2, 3]}>
          <Button
            type="submit"
            fontSize={[3, null, 4]}
            py={[2, null, 3]}
            width="100%"
            disabled={!cityName || loading}
            bg={!cityName || loading ? 'gray' : 'primary'}
          >
            Find
          </Button>
        </Box>
      </Flex>
    </Form>
  )
}

export default HomeCitySearchForm
