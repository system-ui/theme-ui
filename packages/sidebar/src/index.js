/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import { MDXProvider } from '@mdx-js/react'
import React from 'react'
import { Global } from '@emotion/core'
import merge from 'deepmerge'

const Overlay = ({ onClick }) => (
  <React.Fragment>
    <div
      onClick={onClick}
      sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    />
    <Global
      styles={{
        body: {
          overflow: 'hidden',
        },
      }}
    />
  </React.Fragment>
)

export const Sidebar = React.forwardRef(
  ({ open, styles = {}, components, ...props }, ref) => {
    return (
      <ThemeProvider
        theme={{
          styles: merge(
            {
              ul: {
                listStyle: 'none',
                p: 0,
                m: 0,
                ul: {
                  a: {
                    pl: 3,
                  },
                },
              },
              a: {
                display: 'block',
                px: 2,
                py: 2,
                color: 'inherit',
                textDecoration: 'none',
                fontSize: 1,
                fontWeight: 'bold',
              },
            },
            styles
          ),
        }}
      >
        {open && <Overlay {...props} />}
        <MDXProvider components={components}>
          <div
            {...props}
            ref={ref}
            sx={{
              position: ['fixed', 'sticky'],
              top: 0,
              left: 0,
              bottom: [0, 'auto'],
              zIndex: 1,
              minWidth: 0,
              width: [256, 'auto'],
              maxHeight: '100vh',
              overflowX: 'visible',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              transition: 'transform .2s ease-out',
              transform: [open ? 'translateX(0)' : 'translate(-100%)', 'none'],
              bg: ['background', 'transparent'],
            }}
          />
        </MDXProvider>
      </ThemeProvider>
    )
  }
)

export const Pagination = props => <div />
