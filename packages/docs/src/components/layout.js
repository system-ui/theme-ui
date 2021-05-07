/** @jsx jsx */
import { jsx, Themed, useColorMode } from 'theme-ui'
import { useState, useRef } from 'react'
import { Flex, Box } from '@theme-ui/components'
import { AccordionNav } from '@theme-ui/sidenav'
import { Link } from 'gatsby'

import SkipLink from './skip-link'
import Pagination from './pagination'
import EditLink from './edit-link'
import Head from './head'
import MenuButton from './menu-button'
import NavLink from './nav-link'
import Button from './button'
import SearchInput from './search-input'
import Sidebar from '../sidebar.mdx'

const modes = ['default', 'dark', 'deep', 'swiss']

const sidebar = {
  wrapper: AccordionNav,
  a: NavLink,
}

const getModeName = (mode) => {
  switch (mode) {
    case 'dark':
      return 'Dark'
    case 'deep':
      return 'Deep'
    case 'swiss':
      return 'Swiss'
    case 'light':
    case 'default':
      return 'Light'
    case undefined:
      return '         '
    default:
      return mode
  }
}

export default function DocsLayout(props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const nav = useRef(null)
  const [mode, setMode] = useColorMode()

  const fullwidth =
    (props.pageContext.frontmatter &&
      props.pageContext.frontmatter.fullwidth) ||
    props.location.pathname === '/home' ||
    props.location.pathname === '/home/'

  const showNav = !props.pageContext?.frontmatter?.hidenav

  const cycleMode = (e) => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }
  return (
    <Themed.root>
      <Head {...props} />
      <SkipLink>Skip to content</SkipLink>
      <Flex
        sx={{
          flexDirection: 'column',
          minHeight: '100vh',
        }}>
        {showNav && (
          <Flex
            as="header"
            sx={{
              height: 64,
              px: 3,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Flex sx={{ alignItems: 'center' }}>
              <MenuButton
                onClick={(e) => {
                  setMenuOpen(!menuOpen)
                  if (!nav.current) return
                  const navLink = nav.current.querySelector('a')
                  if (navLink) navLink.focus()
                }}
              />
              <Link to="/" sx={{ variant: 'links.nav' }}>
                Theme UI
              </Link>
            </Flex>
            <Flex sx={{ gap: [0, 2] }}>
              <SearchInput />
              <Flex sx={{ alignItems: 'center' }}>
                <NavLink href="https://github.com/system-ui/theme-ui">
                  GitHub
                </NavLink>
                <Button
                  sx={{
                    ml: 2,
                    whiteSpace: 'pre',
                  }}
                  onClick={cycleMode}>
                  {getModeName(mode)}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        )}
        <Box
          sx={{
            flex: '1 1 auto',
            alignItems: 'flex-start',
            display: ['block', 'flex'],
            height: '100%',
          }}>
          <Sidebar
            ref={nav}
            role="navigation"
            onFocus={(e) => {
              setMenuOpen(true)
            }}
            onBlur={(e) => {
              setMenuOpen(false)
            }}
            onClick={(e) => {
              setMenuOpen(false)
            }}
            onKeyPress={(e) => {
              setMenuOpen(false)
            }}
            open={menuOpen}
            components={sidebar}
            pathname={props.location.pathname}
            sx={{
              display: [null, fullwidth ? 'none' : 'block'],
              width: 256,
              flex: 'none',
              maxHeight: ['100%', 'calc(100vh - 64px)'],
              overflowY: 'auto',
              px: 3,
              pt: 3,
              pb: 4,
              mt: [64, 0],
            }}
          />
          <main
            id="content"
            sx={{
              width: '100%',
              minWidth: 0,
              maxWidth: fullwidth ? 'none' : 768,
              mx: 'auto',
              px: fullwidth ? 0 : 3,
            }}>
            {props.children}
            <EditLink />
            {!fullwidth && <Pagination />}
          </main>
        </Box>
      </Flex>
    </Themed.root>
  )
}
