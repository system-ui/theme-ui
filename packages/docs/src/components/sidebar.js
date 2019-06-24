/** @jsx jsx */
import React from 'react'
import { jsx, Box } from 'theme-ui'
import { Global } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import NavLink from './nav-link'
import Content from '../sidebar.mdx'

const components = {
  a: NavLink,
}

export default React.forwardRef(({ fullwidth, ...props }, ref) => (
  <React.Fragment>
    {props.open && (
      <Box
        onClick={props.onClick}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
      >
        <Global
          styles={{
            body: {
              overflow: 'hidden',
            },
          }}
        />
      </Box>
    )}
    <Box
      {...props}
      ref={ref}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        minWidth: 0,
        maxHeight: 'calc(100vh - 64px)',
        overflow: 'auto',
        py: 3,
        WebkitOverflowScrolling: 'touch',
        display: fullwidth ? 'none' : 'block',
        '@media screen and (max-width: 39.99em)': {
          display: 'block',
          position: 'fixed',
          top: 64,
          left: 0,
          bottom: 0,
          width: 256,
          px: 2,
          bg: 'background',
          transition: 'transform .2s ease-out',
          transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
        },
        ul: {
          listStyle: 'none',
          m: 0,
          p: 0,
        },
      }}
    >
      <MDXProvider components={components}>
        <Content />
      </MDXProvider>
    </Box>
  </React.Fragment>
))
