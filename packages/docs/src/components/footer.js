/** @jsx jsx */
import { jsx, Container } from 'theme-ui'
import NavLink from './nav-link'

export default props => (
  <footer
    sx={{
      py: 3,
    }}>
    <Container>
      <div sx={{ display: 'flex' }}>
        <div sx={{ mx: 'auto' }} />
        <NavLink to="/">Theme UI</NavLink>
        <NavLink href="https://github.com/system-ui/theme-ui">GitHub</NavLink>
      </div>
    </Container>
  </footer>
)
