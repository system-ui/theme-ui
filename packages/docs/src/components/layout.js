/** @jsx jsx */
import { jsx, Styled, Layout, Main, Box, Container } from 'theme-ui'
import { useState, useRef } from 'react'
import { Global } from '@emotion/core'

import SkipLink from './skip-link'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
import Pagination from './pagination'
import EditLink from './edit-link'
import Head from './head'

export default props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useRef(null)

  return (
    <Styled.root>
      <Head {...props} />
      <Global
        styles={{
          '*': {
            boxSizing: 'border-box',
          },
          body: {
            margin: 0,
          },
        }}
      />
      <SkipLink>Skip to content</SkipLink>
      <Layout>
        <Header nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Main>
          <Container
            sx={{
              py: 0,
              px: props.fullwidth ? 0 : 3,
              maxWidth: props.fullwidth ? 'none' : '',
            }}
          >
            <div
              sx={{
                display: ['block', 'grid'],
                gridGap: 24,
                gridTemplateColumns: [
                  'auto',
                  props.fullwidth ? '1fr' : '256px 1fr',
                ],
              }}
            >
              <Sidebar
                ref={nav}
                open={menuOpen}
                fullwidth={props.fullwidth}
                onFocus={e => {
                  setMenuOpen(true)
                }}
                onBlur={e => {
                  setMenuOpen(false)
                }}
                onClick={e => {
                  setMenuOpen(false)
                }}
              />
              <Box id="content" width={1}>
                {props.children}
                <EditLink />
                {!props.fullwidth && <Pagination />}
              </Box>
            </div>
          </Container>
        </Main>
        <Footer />
      </Layout>
    </Styled.root>
  )
}
