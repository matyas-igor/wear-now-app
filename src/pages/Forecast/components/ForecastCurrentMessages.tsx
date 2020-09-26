import * as React from 'react'
import { Box, Flex, Text } from 'rebass/styled-components'
import { FlexProps } from 'styled-system'

type Props = {
  icon: any
  messages: string[]
}

const ForecastCurrentMessages: React.FC<Props & FlexProps> = ({ icon, messages, ...props }) => (
  <Flex {...props}>
    <Box sx={{ flexGrow: 0, flexShrink: 0 }} mr={2}>
      {icon}
    </Box>
    <Box sx={{ flexGrow: 1 }} my={-1}>
      {messages.map((message, idx) => (
        <Text py={1} key={idx}>
          {message}
        </Text>
      ))}
    </Box>
  </Flex>
)

export default ForecastCurrentMessages
