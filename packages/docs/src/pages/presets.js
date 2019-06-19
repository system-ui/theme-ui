/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  Styled,
  ColorMode,
} from 'theme-ui'
import { ThemeContext } from '@emotion/core'
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
import Select from '../components/select'

export default props => {
  const [ theme, setTheme ] = useState('base')
  const preset = presets[theme]
  return (
    <div>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Merriweather:400,700|Montserrat:400,700,900|Poppins:400,700,900|Roboto:400,700,900|Roboto+Condensed:400,700'
        />
      </Helmet>
      <div
        css={{
          '*': {
            transition: 'all .2s ease-out',
          }
        }}>
        <ColorMode />
        <Styled.h2>Demo</Styled.h2>
        <label>
          Preset:
          <Select
            value={theme}
            onChange={e => {
              setTheme(e.target.value)
            }}>
            {Object.keys(presets).map(key => (
              <option
                key={key}
                children={key}
              />
            ))}
          </Select>
        </label>
        <ThemeContext.Provider value={preset}>
          <Styled.h2>Colors</Styled.h2>
          <ColorPalette omit={[ 'modes', 'header' ]} />
          <Styled.h2>Typography</Styled.h2>
          <TypeStyle
            fontSize={7}>
            Body: <FontFamily name='body' />
          </TypeStyle>
          <HeadingStyle
            fontFamily='heading'
            fontWeight='heading'
            lineHeight='heading'
            fontSize={7}>
            Heading: <FontFamily name='heading' />
          </HeadingStyle>
          <Styled.h2>Type Scale</Styled.h2>
          <TypeScale />
          <Styled.h2>Raw JSON</Styled.h2>
          <textarea
            value={JSON.stringify(preset, null, 2)}
            rows={16}
            readOnly
            css={{
              width: '100%',
              fontFamily: 'monospace',
              bg: 'muted',
              border: 0,
              borderRadius: 4,
            }}
          />
        </ThemeContext.Provider>
      </div>
    </div>
  )
}
