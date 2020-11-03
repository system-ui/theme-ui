/** @jsx jsx */
import { Helmet } from 'react-helmet'
import { jsx, Styled } from 'theme-ui'
import { ThemeProvider } from '@theme-ui/core'
import * as presets from '@theme-ui/presets'
import {
  TypeScale,
  TypeStyle,
  HeadingStyle,
  ColorPalette,
  FontFamily,
} from '@theme-ui/style-guide'
import Components from './components.mdx'

export default ({ preset: presetName }) => {
  const preset = presets[presetName]

  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Poppins:400,700,900|Roboto:400,600|Architects+Daughter"
        />
      </Helmet>
      <ThemeProvider theme={preset}>
        <Styled.root>
          <Styled.h2>Colors</Styled.h2>
          <ColorPalette omit={['modes', 'header']} />
          <Styled.h2>Typography</Styled.h2>
          <TypeStyle fontSize={7}>
            Body: <FontFamily name="body" />
          </TypeStyle>
          <HeadingStyle
            fontFamily="heading"
            fontWeight="heading"
            lineHeight="heading"
            fontSize={7}>
            Heading: <FontFamily name="heading" />
          </HeadingStyle>
          <Styled.h2>Type Scale</Styled.h2>
          <TypeScale />
          <Components />
          <Styled.h2 id="json">Raw JSON</Styled.h2>
          <textarea
            value={JSON.stringify(preset, null, 2)}
            rows={16}
            readOnly
            aria-labelledby="json"
            sx={{
              width: '100%',
              fontFamily: 'monospace',
              bg: 'muted',
              border: 0,
              borderRadius: 4,
            }}
          />
        </Styled.root>
      </ThemeProvider>
    </div>
  )
}
