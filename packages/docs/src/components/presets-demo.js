import { ThemeUIProvider, Select } from 'theme-ui'
import { Themed } from '@theme-ui/mdx'
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
import Components from './components.mdx'

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
        }}
      >
        <label
          htmlFor="theme"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 4,
            gap: 2,
          }}
        >
          <span>Preset:</span>
          <Select
            id="theme"
            sx={{ display: 'inline-flex' }}
            value={theme}
            onChange={(e) => {
              setTheme(e.target.value)
            }}
          >
            {Object.keys(presets).map((key) => (
              <option key={key} children={key} />
            ))}
          </Select>
        </label>
        <ThemeUIProvider theme={preset}>
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
              fontSize={7}
            >
              Heading: <FontFamily name="heading" />
            </HeadingStyle>
            <Themed.h2>Type Scale</Themed.h2>
            <TypeScale />
            <Components />
            <label htmlFor="json">Raw JSON</label>
            <textarea
              id="json"
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
                color: 'text',
              }}
            />
          </Themed.root>
        </ThemeUIProvider>
      </div>
    </div>
  )
}
