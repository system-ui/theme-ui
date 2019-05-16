/** @jsx jsx */
import {
  jsx,
  Header,
  Box,
  Container,
  useColorMode,
} from 'theme-ui'
import NavLink from './nav-link'
import Button from './button'

const modes = [
  'light',
  'dark',
]

export default props => {
  const [ mode, setMode ] = useColorMode('light')

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  return (
    <Header>
      <Container
        css={{
          display: 'flex',
          alignItems: 'center',
        }}>
        <NavLink to='/'>Theme UI</NavLink>
        <Box mx='auto' />
        <NavLink href='https://github.com/system-ui/theme-ui'>GitHub</NavLink>
        <Button
          css={{
            ml: 2,
          }}
          onClick={cycleMode}>
          {mode}
        </Button>
        {props.children}
      </Container>
    </Header>
  )
}
