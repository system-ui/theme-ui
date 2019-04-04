import React from 'react'
import { Global } from '@emotion/core'
import { Styled } from 'theme-ui'
import Page from './page'
import Header from './header'
import Main from './main'
import Container from './container'
import Footer from './footer'

export default props => {
  return (
    <>
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
