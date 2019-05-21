import React from 'react'
import { ThemeProvider } from 'theme-ui'

const theme = {}

try {
  // console.log(
  //   typeof GATSBY_THEME_UI_PATHS,
  //   typeof BEEP
  // )
  // const paths = GATSBY_THEME_UI_PATHS
  const themes = []
  // paths.forEach(path => {
  //   themes.push(
  //     require(path)
  //   )
  // })
  const t = require(THEME_UI_PATH)
  console.log(themes)
} catch (e) {
  console.error(e)
}

export const wrapRootElement = ({ element, props }) => {
  return (
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  )
}
