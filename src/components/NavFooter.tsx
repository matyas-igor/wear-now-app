import * as React from 'react'
import styled from 'styled-components'
import { Box, Flex, Link, Text, TextProps } from 'rebass/styled-components'

const TextWithEllipsis = styled(Text)<TextProps>`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NavFooter: React.FC = () => (
  <Flex sx={{ borderTop: '1px solid #dddddf' }} flexGrow={0} flexShrink={0} as="nav" px={3} py={2} alignItems="center">
    <TextWithEllipsis p={2}>Igor Matias, 2020</TextWithEllipsis>
    <Box mx="auto" />
    <Link variant="nav" href={'https://github.com/matyas-igor/wear-now'}>
      GitHub
    </Link>
  </Flex>
)

export default NavFooter
