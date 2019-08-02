/** @jsx jsx */
import { jsx, Styled, ColorMode, components } from 'theme-ui'
import { ThemeContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import * as presets from '@theme-ui/presets'
import {
  TypeScale,
  TypeStyle,
  HeadingStyle,
  ColorPalette,
  FontFamily,
} from '@theme-ui/style-guide'
import Lorem from './lorem.mdx'

export default ({ preset: presetName }) => {
  const preset = presets[presetName]

  return (
    <div>
      <ColorMode />
      <ThemeContext.Provider value={preset}>
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
          <MDXProvider components={components}>
            <Lorem />
          </MDXProvider>
          <Styled.h2>Raw JSON</Styled.h2>
          <textarea
            value={JSON.stringify(preset, null, 2)}
            rows={16}
            readOnly
            sx={{
              width: '100%',
              fontFamily: 'monospace',
              bg: 'muted',
              border: 0,
              borderRadius: 4,
            }}
          />
        </Styled.root>
      </ThemeContext.Provider>
    </div>
  )
}
