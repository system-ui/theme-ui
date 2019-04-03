import React from 'react'
import { Styled } from 'theme-ui'
import Container from './container'
import Header from './header'
import Footer from './footer'

export default props => {
  return (
    <>
      <Styled.wrapper>
        <Header />
        <Container>
          {props.children}
        </Container>
        <Footer />
      </Styled.wrapper>
    </>
  )
}
