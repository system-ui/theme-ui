/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout,
  Main,
  Box,
  Container,
} from 'theme-ui'
import { Global } from '@emotion/core'

import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'

export default ({ header, ...props }) => {
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
        <Header>
          {header}
        </Header>
        <Main>
          <Container
            css={{
              display: 'flex',
            }}>
            <Sidebar />
            <Box>
              {props.children}
            </Box>
          </Container>
        </Main>
        <Footer />
      </Layout>
    </Styled.root>
  )
}
