import React from 'react'
import { Styled } from 'theme-ui'
import Page from './page'
import Header from './header'
import Main from './main'
import Container from './container'
import Footer from './footer'

export default props => {
  return (
    <>
      <Styled.wrapper>
        <Page>
          <Header />
          <Main>
            <Container>
              {props.children}
            </Container>
          </Main>
          <Footer />
        </Page>
      </Styled.wrapper>
    </>
  )
}
