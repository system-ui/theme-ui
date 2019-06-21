/** @jsx jsx */
import React from 'react'
import { jsx, Flex, Box } from 'theme-ui'
import { Location } from '@reach/router'
import NavLink from './nav-link'
import Sidebar from '../sidebar.mdx'

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

const PaginationLink = ({
  label,
  parentName,
  mdxType,
  originalType,
  ...props
}) => (
  <NavLink {...props}>
    <div>{label}</div>
    <div
      sx={{
        fontSize: 3,
      }}
    >
      {props.children}
    </div>
  </NavLink>
)

const Pagination = props => {
  const links = flattenLinks(props.children)
  const index = links.findIndex(
    link => link.props.href === removeSlash(props.location.pathname)
  )
  const hasPagination = index > -1
  const previous = links[index - 1]
  const next = links[index + 1]

  return (
    <Flex sx={{ py: 4, mx: -2 }}>
      {hasPagination && previous && (
        <PaginationLink {...previous.props} label="Previous:" />
      )}
      <Box sx={{ mx: 'auto' }} />
      {hasPagination && next && (
        <PaginationLink {...next.props} label="Next:" />
      )}
    </Flex>
  )
}

const removeSlash = str => (str.length > 1 ? str.replace(/\/$/, '') : str)

export default props => (
  <Location>
    {({ location }) => (
      <Sidebar
        location={location}
        components={{
          wrapper: Pagination,
        }}
      />
    )}
  </Location>
)
