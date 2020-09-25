import * as React from 'react'
import { Box } from 'rebass/styled-components'

const width = ['calc(100% - 48px)', '528px', '720px', '944px', '1140px']

const Container: React.FC<{ children?: any }> = ({ children }) => (
  <Box
    sx={{
      width,
      mx: 'auto',
    }}
  >
    {children}
  </Box>
)

export default Container
