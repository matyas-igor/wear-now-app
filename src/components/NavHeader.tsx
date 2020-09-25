import * as React from 'react'
import styled from 'styled-components'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { Flex, Box, Text, TextProps } from 'rebass/styled-components'
import Link from './Link'
import { useEffect, useState } from 'react'
import { City } from '../helpers/types'

const TextWithEllipsis = styled(Text)<TextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const TextWithNoWrap = styled(Text)<TextProps>`
  overflow: hidden;
  white-space: nowrap;
`

const NavHeader: React.FC = () => {
  const location = useLocation()
  const [city, setCity] = useState<Pick<City, 'name' | 'flag'> | null>(null)

  // Getting city properties here
  useEffect(() => {
    if (location.pathname === '/forecast') {
      const data = queryString.parse(location.search)
      setCity({ name: (data.name as string) || '', flag: (data.flag as string) || '' })
    } else {
      setCity(null)
    }
  }, [location])

  return (
    <Flex as="nav" px={3} py={2} color="white" bg="black" alignItems="center">
      <TextWithNoWrap p={2} fontWeight="bold" minWidth={96}>
        Wear Now
      </TextWithNoWrap>
      <Box mx="auto" />
      {location.pathname === '/forecast' && city ? (
        <>
          <TextWithEllipsis p={2}>
            {city.flag}&nbsp; {city.name}
          </TextWithEllipsis>
          <Link sx={{ flexShrink: 0 }} variant="nav" width={70} to={`/?${queryString.stringify({ reset: true })}`}>
            Change
          </Link>
        </>
      ) : null}
    </Flex>
  )
}

export default NavHeader
