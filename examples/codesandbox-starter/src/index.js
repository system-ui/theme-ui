/** @jsx jsx */

import ReactDOM from 'react-dom'
import ThemeProvider, { Reset } from './theme'
import { jsx, Layout, Themed } from 'theme-ui'

function App() {
  return (
    <ThemeProvider theme={{}}>
      <Layout sx={{ p: 3 }}>
        <Reset />
        <Themed.h1 sx={{ color: 'primary', mb: 3 }}>Hello Theme UI</Themed.h1>
        <Themed.p>Start editing to see some magic happen!</Themed.p>
      </Layout>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
