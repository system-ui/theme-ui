/** @jsx jsx */
import { jsx, ThemeProvider, Container } from 'theme-ui'

export default ({ columns = 3, ...props }) => (
  <ThemeProvider
    theme={{
      styles: {
        ol: {
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: ['auto', `repeat(${columns}, 1fr)`],
          gridGap: 24,
          p: 0,
          m: 0,
        },
        ul: {
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: ['auto', 'repeat(3, 1fr)'],
          gridGap: 24,
          p: 0,
          m: 0,
        },
      },
    }}>
    <Container {...props} py={4} />
  </ThemeProvider>
)
