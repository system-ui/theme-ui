/** @jsx jsx */
import { jsx, useColorMode, Layout, Header, Main, Container } from 'theme-ui'
import { Global } from '@emotion/core'

export default props => {
  const [mode, setMode] = useColorMode()
  const toggleMode = e => {
    setMode(mode === 'dark' ? 'light' : 'dark')
  }

  return (
    <Layout>
      <Global
        styles={{
          body: {
            margin: 0,
          },
        }}
      />
      <Header
        css={{
          p: 4,
        }}
      >
        <button title="Toggle Dark Mode" onClick={toggleMode}>
          {mode}
        </button>
      </Header>
      <Main>
        <Container>{props.children}</Container>
      </Main>
    </Layout>
  )
}
