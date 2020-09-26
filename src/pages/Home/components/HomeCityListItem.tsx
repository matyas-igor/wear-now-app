import * as React from 'react'
import styled from 'styled-components'

import { Box, Text, BoxProps } from 'rebass/styled-components'

type Props = {
  city: any
  onClick?: (...args: any[]) => void
}

const StyledBox = styled(Box)<BoxProps>`
  appearance: none;
  cursor: pointer;
  background: unset;
  border: none;
  text-align: left;
  border-bottom: 1px solid #dddddf;
  &:last-of-type {
    border-bottom: 0 !important;
  }
  &:hover {
    background-color: #f6f6f9;
  }
`

const HomeCityListItem: React.FC<Props> = ({ city, onClick }) => (
  <StyledBox as={'button'} width="100%" px={[3, null, 4]} py={[2, null, 3]} minHeight={64} onClick={onClick}>
    <Text fontWeight="bold" fontSize={[2, null, 3]}>
      {city.annotations.flag}&nbsp; {city.formatted}
    </Text>
  </StyledBox>
)

export default HomeCityListItem
