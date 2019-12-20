import React from 'react'
import { ThemeProvider, merge } from 'theme-ui'

const reducer = (state, next) => merge(state, next)

export const EditorProvider = props => {
  const [theme, setTheme] = React.useReducer(reducer, {})

  // will this work??
  const getTheme = outer => {
    setTheme(outer)
    return {
      ...theme,
      setTheme
    }
  }

  return (
    <ThemeProvider theme={getTheme}>
      {props.children}
    </ThemeProvider>
  )
}
