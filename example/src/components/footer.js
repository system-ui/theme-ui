import React from 'react'
import { css } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <footer
    css={css({
      display: 'flex',
      alignItems: 'center',
      p: 3,
    })}>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/layout'>Layout</NavLink>
    <NavLink to='/notes'>Notes</NavLink>
  </footer>
