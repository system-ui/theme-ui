import React from 'react'
import { Helmet } from 'react-helmet'
import { AltProvider as ThemeProvider, ColorMode } from 'theme-ui'
import pkg from 'theme-ui/package.json'
// import components from './mdx-components'

import theme from '../gatsby-theme-ui'

export default props =>
  <ThemeProvider theme={theme}>
    <Helmet>
      <title>Theme UI</title>
      <meta name='description' content={pkg.description} />
      <link rel='icon' type='image/png' href='/icon.png' />
      <link rel='apple-touch-icon' type='image/png' href='/icon.png' />
      <meta name='twitter:card' content='summary' />
      <meta name='twitter:site' content='@jxnblk' />
      <meta name='twitter:image' content='https://theme-ui.com/icon.png' />
      <meta name='twitter:title' content='Theme UI' />
      <meta name='twitter:description' content={pkg.description} />
    </Helmet>
    <ColorMode />
    {props.children}
  </ThemeProvider>
