/** @jsx jsx */
import { jsx, css, ThemeProvider } from 'theme-ui'
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
      styles={css({
        body: {
          overflow: ['hidden', 'auto'],
        },
      })}
    />
  </React.Fragment>
)

export const Sidenav = React.forwardRef(
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
                    pl: 4,
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
        }}>
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
              width: 256,
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

const flattenLinks = children =>
  React.Children.toArray(children).reduce((acc, child) => {
    if (child.props && child.props.mdxType === 'a') {
      return [...acc, child]
    }
    if (!child.props || !child.props.children) return acc
    return React.Children.toArray([
      ...acc,
      ...flattenLinks(child.props.children),
    ])
  }, [])

const removeSlash = str => (str.length > 1 ? str.replace(/\/$/, '') : str)

const PaginationLink = ({
  label,
  children,
  mdxType,
  originalType,
  parentName,
  ...props
}) => (
  <a
    {...props}
    sx={{
      fontSize: 1,
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
    }}>
    <div>{label}</div>
    <div
      sx={{
        fontSize: 3,
      }}>
      {children}
    </div>
  </a>
)

export const Pagination = ({ pathname = '', children, ...props }) => {
  const links = flattenLinks(children)
  const index = links.findIndex(
    link => link.props.href === removeSlash(pathname)
  )
  const hasPagination = index > -1
  const previous = links[index - 1]
  const next = links[index + 1]

  return (
    <div
      {...props}
      sx={{
        display: 'flex',
      }}>
      {hasPagination && previous && (
        <PaginationLink {...previous.props} label="Previous:" />
      )}
      <div sx={{ mx: 'auto' }} />
      {hasPagination && next && (
        <PaginationLink {...next.props} label="Next:" />
      )}
    </div>
  )
}
