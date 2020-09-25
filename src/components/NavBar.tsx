import * as React from 'react'
import { Flex, Box, Text } from 'rebass/styled-components'
import Link from './Link'

const NavBar: React.FC = () => {
  return (
    <Flex as="nav" px={3} py={2} color="white" bg="black" alignItems="center">
      <Text p={2} fontWeight="bold">
        Wear Now
      </Text>
      <Box mx="auto" />
      <Link variant="nav" to="/">
        Change
      </Link>
    </Flex>
  )
}

export default NavBar
