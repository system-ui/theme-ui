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
          display: 'flex',
          flexWrap: 'wrap',
          p: 0,
          mx: -3,
        },
        li: {
          flex: '1 1 420px',
          // fontWeight: 'bold',
          // fontSize: 3,
          p: 3,
        }
      }
    }}>
    <Container
      {...props}
      py={4}
    />
  </ThemeProvider>
