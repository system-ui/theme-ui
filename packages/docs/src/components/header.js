/** @jsx jsx */
import { jsx, Header, Container } from 'theme-ui'

export default props => (
  <Header>
    <Container
      css={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Container>
  </Header>
)
