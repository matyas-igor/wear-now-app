import styled from 'styled-components'
import { compose, layout, LayoutProps, space, SpaceProps } from 'styled-system'

export type IconProps = {
  color?: string
} & SpaceProps &
  LayoutProps

const Icon = styled.span<IconProps>`
  display: inline-flex;
  box-sizing: content-box;
  ${compose(space, layout)}
  & svg {
    fill: ${({ color }) => color};
    width: inherit !important;
    height: inherit !important;
  }
`

export default Icon
