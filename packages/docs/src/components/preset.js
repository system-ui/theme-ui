/** @jsx jsx */
import { jsx, Themed, components } from 'theme-ui'
import { ThemeContext } from '@emotion/react'
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
      <ThemeContext.Provider value={preset}>
        <Themed.root>
          <Themed.h2>Colors</Themed.h2>
          <ColorPalette omit={['modes', 'header']} />
          <Themed.h2>Typography</Themed.h2>
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
          <Themed.h2>Type Scale</Themed.h2>
          <TypeScale />
          <MDXProvider components={components}>
            <Lorem />
          </MDXProvider>
          <Themed.h2 id="json">Raw JSON</Themed.h2>
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
        </Themed.root>
      </ThemeContext.Provider>
    </div>
  )
}
