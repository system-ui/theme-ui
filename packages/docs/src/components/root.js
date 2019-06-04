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
    </Helmet>
    {props.children}
  </ThemeProvider>
