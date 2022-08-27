import { ReactNode } from 'react'
import { Container } from 'theme-ui'

const Layout = (props: { children: ReactNode }) => (
  <Container>{props.children}</Container>
)

export default Layout
