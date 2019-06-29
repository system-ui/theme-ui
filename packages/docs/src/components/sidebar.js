/** @jsx jsx */
import React from 'react'
import { jsx, Box, ThemeProvider } from 'theme-ui'
import { Global } from '@emotion/core'
import { Sidebar } from '@theme-ui/sidebar'
import NavLink from './nav-link'
import Content from '../sidebar.mdx'

const components = {
  // wrapper: Sidebar,
  a: NavLink,
}

export default React.forwardRef((props, ref) => (
  <Sidebar
    {...props}
    components={components}
    ref={ref}
    sx={{
      px: [3, 0],
      py: 3,
      mt: [64, 0],
    }}
  >
    <Content />
  </Sidebar>
))

/*
export default (props) =>
  <Content
    {...props}
    sx={{
    }}
    components={{
      wrapper: Sidebar,
      a: NavLink,
    }}
  />
*/
