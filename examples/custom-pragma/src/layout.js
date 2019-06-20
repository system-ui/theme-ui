/** @jsx jsx */
import { jsx, Layout, Header, Main, Container } from 'theme-ui'

export default props => (
  <Layout>
    <Header>
      <h2>Theme UI Gatsby Example</h2>
    </Header>
    <Main>
      <Container>{props.children}</Container>
    </Main>
  </Layout>
)
