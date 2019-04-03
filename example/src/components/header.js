import React from 'react'
import { css } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <header
    css={css({
      display: 'flex',
      alignItems: 'center',
    })}>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    <NavLink to='/debug-theme'>Debug Theme</NavLink>
    <div css={{ margin: 'auto' }} />
    {props.children}
  </header>
