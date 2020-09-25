import * as React from 'react'
import { Box } from 'rebass/styled-components'

const WIDTH = ['calc(100% - 48px)', '528px', '720px', '944px', '1140px']
const WIDTH_SMALL = ['calc(100% - 48px)', '400px', '480px', '520px', '560px']

const Container: React.FC<{ small?: boolean; children?: any }> = ({ small, children }) => (
  <Box width={small ? WIDTH_SMALL : WIDTH} mx="auto">
    {children}
  </Box>
)

export default Container
