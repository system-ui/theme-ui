/** @jsx jsx */

import ReactDOM from 'react-dom'
import ThemeProvider, { Reset } from './theme'
import { jsx, Layout, Styled } from 'theme-ui'

function App() {
  return (
    <ThemeProvider>
      <Layout sx={{ p: 3 }}>
        <Reset />
        <Styled.h1 sx={{ color: 'primary', mb: 3 }}>Hello Theme UI</Styled.h1>
        <Styled.p>Start editing to see some magic happen!</Styled.p>
      </Layout>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
