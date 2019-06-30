/** @jsx jsx */
import React from 'react'
import { jsx, Box, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import { Sidenav } from '@theme-ui/sidenav'
import NavLink from './nav-link'
import Content from '../sidebar.mdx'

const components = {
  a: NavLink,
}

export default React.forwardRef((props, ref) => (
  <Sidenav
    {...props}
    components={components}
    ref={ref}
    sx={{
      width: 256,
      flex: 'none',
      px: 3,
      pt: 3,
      pb: 4,
      mt: [64, 0],
    }}
  >
    <Content />
  </Sidenav>
))
