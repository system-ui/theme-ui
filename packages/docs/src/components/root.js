import React from 'react'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'theme-ui'
import pkg from 'theme-ui/package.json'
import components from './mdx-components'

export default props =>
  <ThemeProvider components={components}>
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
    {props.children}
  </ThemeProvider>
