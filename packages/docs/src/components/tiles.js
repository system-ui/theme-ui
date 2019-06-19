/** @jsx jsx */
import { jsx, ThemeProvider, Box, Container } from 'theme-ui'

export default props => (
  <ThemeProvider
    theme={{
      styles: {
        ul: {
          listStyle: 'none',
          display: ['block', 'grid'],
          gridTemplateColumns: ['auto', 'repeat(3, 1fr)'],
          gridGap: 24,
          p: 0,
          m: 0,
        },
        li: {
          py: 3,
          px: [0, 2],
        },
      },
    }}
  >
    <Container {...props} py={4} />
  </ThemeProvider>
)
