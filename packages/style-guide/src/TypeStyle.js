/** @jsx jsx */
import { jsx } from 'theme-ui'
import Card from './Card'

export const TypeStyle = ({
  fontSize = 5,
  fontFamily = 'body',
  lineHeight = 'body',
  fontWeight = 'body',
  children = 'Aa',
  truncate = true,
  ...props
}) => {
  return (
    <Card
      {...props}
      children={children}
      sx={{
        fontFamily,
        fontSize,
        lineHeight,
        fontWeight,
        ...(truncate
          ? {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }
          : {}),
      }}
    />
  )
}

export default TypeStyle
