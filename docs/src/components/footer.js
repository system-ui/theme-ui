/** @jsx jsx */
import { jsx, Footer, Container } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <Footer>
    <Container
      css={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/demo'>Demo</NavLink>
      <NavLink to='/typography'>Typography</NavLink>
      <NavLink to='/color'>Color</NavLink>
      <NavLink to='/layout'>Layout</NavLink>
      <NavLink to='/components'>Components</NavLink>
    </Container>
  </Footer>
