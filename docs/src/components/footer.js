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
      <NavLink to='/'>Theme UI</NavLink>
      <NavLink href='https://github.com/system-ui/theme-ui'>GitHub</NavLink>
    </Container>
  </Footer>
