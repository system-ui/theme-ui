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
    <Box
      sx={{
        py: [5, 6],
        color: 'background',
        bg: 'primary',
      }}
    >
      <Container
        sx={{
          py: 0,
          display: 'grid',
          gridTemplateColumns: ['1f', 'repeat(3, 1fr)'],
          gridGap: 24,
          gridAutoFlow: ['row', 'column', 'column'],
          alignItems: ['flex-start', 'flex-start', 'center'],
        }}
      >
        <Logo
          size="1em"
          color="currentcolor"
          sx={{
            fontSize: [96, 96, 160],
          }}
        />
        <Box
          sx={{
            py: 3,
            gridColumn: ['auto', '2 / 4'],
          }}
        >
          {props.children}
        </Box>
      </Container>
    </Box>
  </ThemeProvider>
)
