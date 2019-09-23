/** @jsx jsx */
import { jsx } from 'theme-ui'
import NavLink from './nav-link'

export default props => (
  <footer
    sx={{
      p: 3,
      mx: 'auto',
      display: 'flex',
    }}>
    <div sx={{ mx: 'auto' }} />
    <NavLink to="/">Theme UI</NavLink>
    <NavLink href="https://github.com/system-ui/theme-ui">GitHub</NavLink>
  </footer>
)
