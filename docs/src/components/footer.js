/** @jsx jsx */
import { jsx, Footer } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <Footer
    css={{
      flexWrap: 'wrap',
      alignItems: 'center',
      p: 3,
    }}>
    <NavLink to='/'>Home</NavLink>
    <NavLink to='/demo'>Demo</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    <NavLink to='/color'>Color</NavLink>
    <NavLink to='/layout'>Layout</NavLink>
    <NavLink to='/components'>Components</NavLink>
  </Footer>
