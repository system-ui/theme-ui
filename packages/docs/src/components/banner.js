/** @jsx jsx */
import { jsx, ThemeProvider, Box, Container } from 'theme-ui'
import Logo from './logo'

export default props => (
  <ThemeProvider
    theme={{
      styles: {
        h1: {
          fontSize: [5, 6, 7],
          fontWeight: 900,
          letterSpacing: '0.05em',
          mt: 0,
          mb: 4,
        },
        p: {
          fontWeight: 'bold',
          mt: 0,
          mb: 3,
          ':first-of-type': {
            fontSize: [2, 3, 4],
          },
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
    }}
  >
    <Box py={[5, 6]} color="background" bg="primary">
      <Container
        scss={{
          display: 'flex',
          flexDirection: ['column', 'column', 'row'],
          alignItems: ['flex-start', 'flex-start', 'center'],
          justifyContent: 'space-between',
        }}
      >
        <Logo
          size="1em"
          color="currentcolor"
          scss={{
            fontSize: [96, 96, 160],
          }}
        />
        <Box py={3} width={['auto', 'auto', '66.666%']}>
          {props.children}
        </Box>
      </Container>
    </Box>
  </ThemeProvider>
)
