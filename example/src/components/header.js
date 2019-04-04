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
    <div css={{ margin: 'auto' }} />
    <NavLink to='/typography'>Typography</NavLink>
    {props.children}
  </header>
