import * as React from 'react'
import { Link as RebassLink, LinkProps as RebassLinkProps } from 'rebass/styled-components'
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom'

export type LinkProps = RebassLinkProps & RouterLinkProps

const Link: React.FC<LinkProps> = (props) => <RebassLink as={RouterLink} {...props} />

export default Link
