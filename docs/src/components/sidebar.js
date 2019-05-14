/** @jsx jsx */
import { jsx, Box, ThemeProvider } from 'theme-ui'
import Content from '../sidebar.mdx'

const theme = {
  styles: {
    ul: {
      listStyle: 'none',
      m: 0,
      p: 0,
    },
    a: {
      display: 'block',
      px: 2,
      py: 1,
      fontWeight: 'bold',
      color: 'inherit',
      textDecoration: 'none',
    }
  }
}

export default props =>
  <Box {...props}
    css={{
      position: 'sticky',
      top: 0,
      minWidth: 0,
      width: [ 128, 256 ],
      flex: 'none',
      p: 0,
      maxHeight: '100vh',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
    }}>
    <ThemeProvider theme={theme}>
      <Content />
    </ThemeProvider>
  </Box>
