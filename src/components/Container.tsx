import * as React from 'react'
import { Box, BoxProps } from 'rebass/styled-components'

const WIDTH = ['calc(100% - 48px)', '528px', '720px', '944px', '1140px']
const WIDTH_SMALL = ['calc(100% - 48px)', '400px', '480px', '520px', '560px']

export type ContainerProps = { small?: boolean; children?: any } & BoxProps

const Container: React.FC<ContainerProps> = ({ small, children, ...props }) => (
  <Box width={small ? WIDTH_SMALL : WIDTH} mx="auto" {...props}>
    {children}
  </Box>
)

export default Container
