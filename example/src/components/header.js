import React from 'react'
import { css } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <header
    css={css({
      display: 'flex',
      alignItems: 'center',
      color: 'header.text',
      bg: 'header.background',
    })}>
    <NavLink to='/'>Home</NavLink>
    <div css={{ margin: 'auto' }} />
    <NavLink to='/demo'>Demo</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    {props.children}
  </header>
