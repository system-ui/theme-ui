import TypeStyle, { TypeStyleProps } from './TypeStyle'

export const HeadingStyle = (props: TypeStyleProps) => (
  <TypeStyle
    fontFamily="heading"
    fontWeight="heading"
    lineHeight="heading"
    {...props}
  />
)

export default HeadingStyle
