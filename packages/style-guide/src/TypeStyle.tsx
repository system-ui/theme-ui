import { ComponentProps } from 'react'
import Card from './Card'

export interface TypeStyleProps extends ComponentProps<typeof Card> {
  fontSize?: number | string
  fontFamily?: string
  lineHeight?: string
  fontWeight?: string
  truncate?: boolean
}
export const TypeStyle = ({
  fontSize = 5,
  fontFamily = 'body',
  lineHeight = 'body',
  fontWeight = 'body',
  children = 'Aa',
  truncate = true,
  ...props
}: TypeStyleProps) => {
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
