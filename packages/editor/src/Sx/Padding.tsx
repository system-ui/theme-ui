/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Space, SpaceProps } from './Space'

export interface PaddingProps extends Omit<SpaceProps, 'property'> {}

export const Padding = (props: PaddingProps) => (
  <Space {...props} property="padding" />
)
