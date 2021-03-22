/** @jsx jsx */
import { jsx, ThemeProvider, Themed } from 'theme-ui'
import theme from './theme'

// does not currently work with MDX v1
// import { importMDX } from 'mdx.macro'
// const Demo = importMDX.sync('./demo.mdx')

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div
        css={{
          fontFamily: 'body',
          color: 'text',
          bg: 'background',
        }}>
        <Themed.h1>Theme UI + Create React App</Themed.h1>
      </div>
    </ThemeProvider>
  )
}

export default App
