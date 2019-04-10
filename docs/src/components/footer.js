import React from 'react'
import { css } from 'theme-ui'
import { Footer } from 'theme-ui/layout'
import NavLink from './nav-link'

export default props =>
  <Footer
    css={css({
      flexWrap: 'wrap',
      alignItems: 'center',
      p: 3,
    })}>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/demo'>Demo</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    <NavLink to='/color'>Color</NavLink>
    <NavLink to='/layout'>Layout</NavLink>
    <NavLink to='/components'>Components</NavLink>
  </Footer>
