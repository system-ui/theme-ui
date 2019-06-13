/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout,
  Main,
  Box,
  Container,
  useColorMode,
} from 'theme-ui'
import { useState, useRef } from 'react'
import { Global } from '@emotion/core'

import SkipLink from './skip-link'
import Header from './header'
import Footer from './footer'
import Sidebar from './sidebar'
import Pagination from './pagination'
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Button from './button'

const modes = [
  'light',
  'dark',
  'deep',
  'swiss',
]

export default props => {
  const [ menuOpen, setMenuOpen ] = useState(false)
  const [ mode, setMode ] = {} // useColorMode()
  const nav = useRef(null)

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

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
      <SkipLink>
        Skip to content
      </SkipLink>
      <Layout>
        <Header>
          <MenuButton
            onClick={e => {
              setMenuOpen(!menuOpen)
              if (!nav.current) return
              const navLink = nav.current.querySelector('a')
              if (navLink) navLink.focus()
            }}
          />
          <NavLink to='/'>Theme UI</NavLink>
          <Box mx='auto' />
          <NavLink href='https://github.com/system-ui/theme-ui'>GitHub</NavLink>
          <Button
            css={{
              ml: 2,
            }}
            onClick={cycleMode}>
            {mode}
          </Button>
        </Header>
        <Main>
          <Container
            css={{
              p: 0,
              display: 'flex',
              maxWidth: props.fullwidth ? 'none' : '',
            }}>
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
            <Box
              id='content'
              width={1}
              px={props.fullwidth ? 0 : 3}>
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
