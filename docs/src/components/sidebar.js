/** @jsx jsx */
import { jsx, Box, ThemeProvider } from 'theme-ui'
import { Link } from 'gatsby'
import Content from '../sidebar.mdx'

const components = {
  a: ({ href, ...props }) => <Link {...props} to={href} activeClassName='active' />,
}

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
      '&.active': {
        color: 'primary',
      }
    }
  }
}

export default props =>
  <Box {...props}
    css={{
      position: 'sticky',
      top: 0,
      minWidth: 0,
      width: [ '100%', 256 ],
      flex: 'none',
      py: 3,
      maxHeight: '100vh',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      '@media screen and (max-width: 39.99em)': {
        bg: 'background',
        marginLeft: '-100%',
        transition: 'transform .2s ease-out',
        transform: props.open ? 'translateX(100%)' : 'translateX(0)',
      }
    }}>
      <ThemeProvider
        components={components}
        theme={theme}>
      <Content />
    </ThemeProvider>
  </Box>
