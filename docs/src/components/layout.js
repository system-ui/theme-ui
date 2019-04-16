import React from 'react'
import { Global } from '@emotion/core'
import { Styled } from 'theme-ui'
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
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box'
          },
          body: {
            margin: 0,
          }
        }}
      />
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
