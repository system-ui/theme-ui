/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout,
  Main,
  Box,
  Container,
} from 'theme-ui'
import { useState } from 'react'
import { Global } from '@emotion/core'

import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
import Pagination from './pagination'
import MenuButton from './menu-button'

export default ({ header, ...props }) => {
  const [ menuOpen, setMenuOpen ] = useState(false)

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
          <MenuButton
            onClick={e => {
              setMenuOpen(!menuOpen)
            }}
          />
        </Header>
        <Main>
          <Container
            css={{
              display: 'flex',
            }}>
            <Sidebar
              open={menuOpen}
              onClick={e => {
                setMenuOpen(false)
              }}
            />
            <Box>
              {props.children}
              <Pagination />
            </Box>
          </Container>
        </Main>
        <Footer />
      </Layout>
    </Styled.root>
  )
}
