/** @jsx jsx */
import {
  jsx,
  ThemeProvider,
  Box,
  Container,
} from 'theme-ui'

export default props =>
  <ThemeProvider
    theme={{
      styles: {
        ul: {
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: 16,
          p: 0,
          // '::after': {
          //   content: '" "',
          //   display: 'block',
          //   flex: '1 1 420px',
          // }
        },
        // li: {
        //   flex: '1 1 420px',
        //   p: 3,
        // }
      }
    }}>
    <Container
      {...props}
      py={4}
    />
  </ThemeProvider>
