import React, { useState } from 'react'
import { ThemeProvider, Styled, css } from 'theme-ui'
import merge from 'lodash.merge'

import GoogleFonts from './google-fonts'
import Page from './page'
import Header from './header'
import Main from './main'
import Container from './container'
import themes from './typography-themes'
import createTypographyStyles from 'theme-ui/typography'
import typographyThemes from './typography-themes'
import baseTheme from './theme'

const themeNames = Object.keys(themes)

const ThemeSelect = props =>
  <div>
    <label
      htmlFor={props.name}
      css={{
        fontSize: 16,
        marginRight: 8,
      }}>
      Theme
    </label>
    <select
      id={props.name}
      {...props}
      css={css({
        fontFamily: 'system-ui, sans-serif',
        fontSize: 16,
        p: 2,
      })}>
      {themeNames.map(name => (
        <option
          key={name}
          label={name}
          value={name}
        />
      ))}
    </select>
  </div>

export default props => {
  // switch typography themes
  const [ themeName, setTheme ] = useState(themeNames[0])

  const typographyTheme = typographyThemes[themeName]
  const typography = createTypographyStyles(typographyTheme)

  const theme = merge({}, baseTheme, {
    styles: typography.styles,
    typography
  })

  return (
    <ThemeProvider theme={theme}>
      <GoogleFonts />
      <Styled.wrapper>
        <Page>
          <Header>
            <ThemeSelect
              name='theme'
              value={themeName}
              onChange={e => {
                setTheme(e.target.value)
              }}
            />
          </Header>
          <Main>
            <Container>
              {props.children}
            </Container>
          </Main>
        </Page>
      </Styled.wrapper>
    </ThemeProvider>
  )
}
