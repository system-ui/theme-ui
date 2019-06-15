/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  Styled,
  ColorMode,
} from 'theme-ui'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import * as presets from '@theme-ui/presets'
import Layout from '../components/layout'

export default props => {
  const [ theme, setTheme ] = useState('base')
  const preset = presets[theme]
  return (
    <ThemeProvider theme={preset}>
      <Helmet>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css?family=Merriweather:400,700|Montserrat:400,700,900|Poppins:400,700,900|Roboto:400,700,900|Roboto+Condensed:400,700'
        />
      </Helmet>
      <Layout
        css={{
          transition: 'all .2s ease-out',
        }}>
        <ColorMode />
        <Styled.h1>Demo: {theme} preset</Styled.h1>
        <label>
          Preset:
          <select
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
          </select>
        </label>
      </Layout>
    </ThemeProvider>
  )
}
