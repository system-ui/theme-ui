import React from 'react'
import { Styled, Reset } from 'theme-ui'
import {
  Layout,
  Main,
  Container,
} from 'theme-ui/layout'

import Header from './header'
import Footer from './footer'

export default props => {
  return (
    <Styled.root>
      <Reset />
      <Layout>
        <Header />
        <Main>
          <Container>
            {props.children}
          </Container>
        </Main>
        <Footer />
      </Layout>
    </Styled.root>
  )
}
