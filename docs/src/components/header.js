import React from 'react'
import { css } from 'theme-ui'
import { Header, Box } from 'theme-ui/layout'
import NavLink from './nav-link'

export default props =>
  <Header
    css={css({
      alignItems: 'center',
      color: 'header.text',
      bg: 'header.background',
    })}>
    <NavLink to='/'>Home</NavLink>
    <Box mx='auto' />
    <NavLink to='/demo'>Demo</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    {props.children}
  </Header>
