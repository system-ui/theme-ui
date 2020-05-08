/** @jsx jsx */
import { jsx } from 'theme-ui'
import Space, { SpaceProps } from './Space'

type PaddingProps = Omit<SpaceProps, 'property'>

export const Padding = (props: PaddingProps) => (
  <Space {...props} property="padding" />
)

export default Padding
