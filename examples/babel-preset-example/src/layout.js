import React from 'react'
import { Layout, Header, Main, Container } from 'theme-ui'

export default props => (
  <Layout>
    <Header>
      <h2 sx={{ color: 'primary' }}>Theme UI Babel Preset Example</h2>
    </Header>
    <Main>
      <Container>{props.children}</Container>
    </Main>
  </Layout>
)
