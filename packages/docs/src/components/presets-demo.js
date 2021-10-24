/** @jsx jsx */
import { jsx, Themed, components } from 'theme-ui'
import { ThemeContext } from '@emotion/react'
import { MDXProvider } from '@mdx-js/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import * as presets from '@theme-ui/presets'
import {
  TypeScale,
  TypeStyle,
  HeadingStyle,
  ColorPalette,
  FontFamily,
} from '@theme-ui/style-guide'
import Select from './select'
import Lorem from './lorem.mdx'

export default function PresetsDemo() {
  const [theme, setTheme] = useState('base')
  const preset = presets[theme]

  return (
    <div>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Poppins:400,700,900|Roboto:400,600|Architects+Daughter"
        />
      </Helmet>
      <div
        sx={{
          '*': {
            transition: 'all .2s ease-out',
          },
        }}>
        <label
          htmlFor="theme"
          sx={{
            display: 'block',
            mb: 4,
          }}>
          Preset:
          <Select
            id="theme"
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value)
            }}>
            {Object.keys(presets).map((key) => (
              <option key={key} children={key} />
            ))}
          </Select>
        </label>
        <ThemeContext.Provider value={preset}>
          <Themed.root sx={{ bg: 'background', color: 'text', p: 3 }}>
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
    </div>
  )
}
