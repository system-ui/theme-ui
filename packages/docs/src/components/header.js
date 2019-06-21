/** @jsx jsx */
import { jsx, Header, Container } from 'theme-ui'

export default props => (
  <Header>
    <Container
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {props.children}
    </Container>
  </Header>
)
