/** @jsx jsx */
import { jsx, Header, Box, Container, } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <Header>
    <Container
      css={{
        display: 'flex',
        alignItems: 'center',
      }}>
      <NavLink to='/'>Theme UI</NavLink>
      <Box mx='auto' />
      <NavLink href='https://github.com/system-ui/theme-ui'>GitHub</NavLink>
      <NavLink to='/demo'>Demo</NavLink>
      {props.children}
    </Container>
  </Header>
