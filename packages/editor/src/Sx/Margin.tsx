/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Space, SpaceProps } from './Space'

export interface MarginProps extends Omit<SpaceProps, 'property'> {}

export const Margin = (props: MarginProps) => (
  <Space {...props} property="margin" />
)
