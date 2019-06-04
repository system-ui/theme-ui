/** @jsx jsx */
import { jsx, Footer, Container, Flex } from 'theme-ui'
import NavLink from './nav-link'

export default props =>
  <Footer>
    <Container>
      <Flex mx={-2}>
        <NavLink to='/'>Theme UI</NavLink>
        <NavLink href='https://github.com/system-ui/theme-ui'>GitHub</NavLink>
      </Flex>
    </Container>
  </Footer>
