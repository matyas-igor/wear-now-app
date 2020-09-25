import * as React from 'react'
import { Link as RebassLink, LinkProps as RebassLinkProps } from 'rebass/styled-components'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

const Link: React.FC<RebassLinkProps & RouterLinkProps> = (props) => <RebassLink as={RouterLink} {...props} />

export default Link
