/** @jsx jsx */
import { jsx, Header, Box } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <Header
    css={{
      alignItems: 'center',
      color: 'header.text',
      bg: 'header.background',
    }}>
    <NavLink to='/'>Home</NavLink>
    <Box mx='auto' />
    <NavLink to='/demo'>Demo</NavLink>
    <NavLink to='/typography'>Typography</NavLink>
    {props.children}
  </Header>
