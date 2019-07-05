/** @jsx jsx */
import { jsx, ThemeProvider, Container } from 'theme-ui'
import Logo from './logo'

const gradient = `linear-gradient(120deg,
  rgba(230, 59, 25, .5),
  rgba(51, 51, 238, 0),
  rgba(51, 51, 238, .25))`

export default props => (
  <ThemeProvider
    theme={{
      styles: {
        p: {
          ':first-of-type': {
            fontSize: [6, 7, 7],
            fontWeight: 900,
            letterSpacing: '0.05em',
          },
          fontWeight: 'bold',
          mt: 0,
          mb: 3,
        },
        h1: {
          fontSize: [3, 3, 4],
          mt: 0,
          mb: 4,
        },
        a: {
          display: 'inline-block',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: 2,
          p: 3,
          color: 'primary',
          bg: 'background',
          mr: 3,
          mb: 3,
          borderRadius: 6,
          ':hover': {
            color: 'background',
            bg: 'text',
          },
        },
      },
    }}>
    <div
      sx={{
        py: [5, 6],
        color: 'background',
        bg: 'primary',
        backgroundImage: gradient,
      }}>
      <Container>
        <div
          sx={{
            maxWidth: 512,
            mx: 'auto',
          }}>
          {props.children}
        </div>
      </Container>
    </div>
  </ThemeProvider>
)
