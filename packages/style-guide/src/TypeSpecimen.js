import React from 'react'
import get from 'lodash.get'
import { useTheme } from './context'

export const TypeSpecimen = ({
  fontSize = 5,
  fontFamily = 'body',
  lineHeight = 'body',
  fontWeight = 'body',
  children = 'Aa',
  ...props
}) => {
  const {
    components: {
      Card,
    },
    fonts,
    fontSizes,
    lineHeights,
    fontWeights,
  } = useTheme()

  return (
    <Card
      {...props}
      children={children}
      style={{
        fontFamily: get(fonts, fontFamily),
        fontSize: get(fontSizes, fontSize),
        lineHeight: get(lineHeights, lineHeight),
        fontWeight: get(fontWeights, fontWeight),
        // truncate
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
    />
  )
}

export default TypeSpecimen
