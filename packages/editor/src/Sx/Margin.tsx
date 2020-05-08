/** @jsx jsx */
import { jsx } from 'theme-ui'
import Space, { SpaceProps } from './Space'

type MarginProps = Omit<SpaceProps, 'property'>

export const Margin = (props: MarginProps) => (
  <Space {...props} property="margin" />
)

export default Margin
