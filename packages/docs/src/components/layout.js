/** @jsx jsx */
import { jsx, Styled } from 'theme-ui'
import { useState, useRef } from 'react'
import { Global } from '@emotion/core'

import SkipLink from './skip-link'
import Header from './header'
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
      <Header nav={nav} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div
        sx={{
          display: ['block', 'flex'],
          pb: 5,
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
            maxWidth: props.fullwidth ? 'none' : 'container',
            mx: 'auto',
            px: props.fullwidth ? 0 : 3,
          }}>
          {props.children}
          <EditLink />
          {!props.fullwidth && <Pagination />}
        </div>
      </div>
    </Styled.root>
  )
}
