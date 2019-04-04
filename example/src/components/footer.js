import React from 'react'
import { css } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <footer
    css={css({
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      p: 3,
    })}>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/Demo'>Demo</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    <NavLink to='/color'>Color</NavLink>
    <NavLink to='/layout'>Layout</NavLink>
    <NavLink to='/components'>Components</NavLink>
  </footer>
