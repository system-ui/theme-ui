/** @jsx jsx */
import {
  jsx,
  Header,
  Container,
} from 'theme-ui'

export default props =>
  <Header>
    <Container
      css={{
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'space-between',
      }}>
      {props.children}
    </Container>
  </Header>
