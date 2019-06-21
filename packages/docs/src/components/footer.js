/** @jsx jsx */
import { jsx, Footer, Container, Flex } from 'theme-ui'
import NavLink from './nav-link'

export default props => (
  <Footer
    sx={{
      pt: 4,
    }}
  >
    <Container>
      <Flex>
        <NavLink to="/">Theme UI</NavLink>
        <NavLink href="https://github.com/system-ui/theme-ui">GitHub</NavLink>
      </Flex>
    </Container>
  </Footer>
)
