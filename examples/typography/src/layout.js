/** @jsx jsx */
import { jsx, Layout, Main, Container } from 'theme-ui'

const Layout = (props) => (
  <Layout>
    <Main>
      <Container>{props.children}</Container>
    </Main>
  </Layout>
)

export default Layout
