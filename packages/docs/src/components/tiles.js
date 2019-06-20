/** @jsx jsx */
import { jsx, ThemeProvider, Box, Container } from 'theme-ui'

export default props => (
  <ThemeProvider
    theme={{
      styles: {
        ul: {
          listStyle: 'none',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          p: 0,
          mx: -3,
          '::after': {
            content: '" "',
            display: 'block',
            flex: '1 1 420px',
          },
        },
        li: {
          flex: '1 1 420px',
          p: 3,
        },
      },
    }}
  >
    <Container {...props} py={4} />
  </ThemeProvider>
)
