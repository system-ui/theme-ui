/** @jsx jsx */
import {
  jsx,
  Styled,
  Layout,
  Main,
  Box,
  Container,
  useColorMode
} from "theme-ui"
import { useState, useRef } from "react"
import { Global } from "@emotion/core"
import { Helmet } from "react-helmet"
import pkg from "theme-ui/package.json"

import SkipLink from "./skip-link"
import Header from "./header"
import Footer from "./footer"
import Sidebar from "./sidebar"
import Pagination from "./pagination"

const modes = ["light", "dark", "deep", "swiss"]

export default props => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mode, setMode] = useColorMode()
  const nav = useRef(null)

  const cycleMode = e => {
    const i = modes.indexOf(mode)
    const next = modes[(i + 1) % modes.length]
    setMode(next)
  }

  const title = [
    props._frontmatter ? props._frontmatter.title : false,
    "Theme UI"
  ]
    .filter(Boolean)
    .join(" — ")

  return (
    <Styled.root>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={pkg.description} />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" type="image/png" href="/icon.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@jxnblk" />
        <meta name="twitter:image" content="https://theme-ui.com/icon.png" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={pkg.description} />
      </Helmet>
      <Global
        styles={{
          "*": {
            boxSizing: "border-box"
          },
          body: {
            margin: 0
          }
        }}
      />
      <SkipLink>Skip to content</SkipLink>
      <Layout>
        <Header
          cycleMode={cycleMode}
          mode={mode}
          nav={nav}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
        <Main>
          <Container
            css={{
              py: 0,
              px: props.fullwidth ? 0 : 3,
              maxWidth: props.fullwidth ? "none" : ""
            }}
          >
            <div
              css={{
                display: ["block", "grid"],
                gridGap: 24,
                gridTemplateColumns: [
                  "auto",
                  props.fullwidth ? "1fr" : "256px 1fr"
                ]
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
