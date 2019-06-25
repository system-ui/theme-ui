/** @jsx jsx */
import { jsx } from 'theme-ui'
import TypeStyle from './TypeStyle'

export const HeadingStyle = props => (
  <TypeStyle
    fontFamily="heading"
    fontWeight="heading"
    lineHeight="heading"
    {...props}
  />
)

export default HeadingStyle
