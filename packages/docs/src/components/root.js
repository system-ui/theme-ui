import React from 'react'

import { ThemeProvider } from 'theme-ui'
import components from './mdx-components'

export default props =>
  <ThemeProvider components={components}>
    {props.children}
  </ThemeProvider>
