/** @jsx jsx */
import { ComponentProps, Fragment } from 'react'
import GoogleFontLoader from 'react-google-font-loader'
import { jsx, get } from 'theme-ui'
import { useTheme } from './context'
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
  const { fonts } = useTheme()!
  const ff = get(fonts!, fontFamily)
  const fontNameMatch = ff.match(/"(.*?)"/);
  const font = fontNameMatch
    && fontNameMatch[1];
  return (
    <Fragment>
      {font && <GoogleFontLoader
            fonts={[
            { font }
          ]}
        />
      }
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
    </Fragment>
  )
}

export default TypeStyle
