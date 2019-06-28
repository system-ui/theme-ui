/** @jsx jsx */

import ReactDOM from 'react-dom'
import ThemeProvider, { Reset } from './theme'
import { jsx, Layout, Styled as S } from 'theme-ui'

function App() {
  return (
    <ThemeProvider>
      <Layout sx={{ p: 3 }}>
        <Reset />
        <S.h1 sx={{ color: 'primary', mb: 3 }}>Hello Theme UI</S.h1>
        <S.p>Start editing to see some magic happen!</S.p>
      </Layout>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
