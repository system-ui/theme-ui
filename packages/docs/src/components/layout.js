/** @jsx jsx */
import { jsx, Styled, Container } from 'theme-ui'
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
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        <Header nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main
          sx={{
            flex: '1 1 auto',
          }}>
          <Container
            sx={{
              pt: 0,
              pb: 5,
              px: props.fullwidth ? 0 : 3,
              maxWidth: props.fullwidth ? 'none' : '',
            }}>
            <div
              sx={{
                display: ['block', 'flex'],
                mx: props.fullwidth ? 0 : -3,
              }}>
              <div
                ref={nav}
                onFocus={e => {
                  setMenuOpen(true)
                }}
                onBlur={e => {
                  setMenuOpen(false)
                }}
                onClick={e => {
                  setMenuOpen(false)
                }}>
                <Sidebar
                  open={menuOpen}
                  sx={{
                    display: [null, props.fullwidth ? 'none' : 'block'],
                  }}
                />
              </div>
              <div
                id="content"
                sx={{
                  width: '100%',
                  minWidth: 0,
                  px: props.fullwidth ? 0 : 3,
                }}>
                {props.children}
                <EditLink />
                {!props.fullwidth && <Pagination />}
              </div>
            </div>
          </Container>
        </main>
        {props.fullwidth && <Footer />}
      </div>
    </Styled.root>
  )
}
