/** @jsx jsx */
import { jsx, ThemeProvider, useThemeUI, merge } from 'theme-ui'
import { useEffect, useReducer } from 'react'
import { ThemeContext as Emotion } from '@emotion/core'
import { EditorContext } from './context'

const theme = {
  colors: {
    primary: 'hsl(210, 100%, 40%)',
    highlight: 'hsl(210, 50%, 95%)',
  },
}

const reducer = (state, next) => merge(state, next)

export default ({
  context,
  fontSize = 16,
  color,
  bg,
  ...props
}) => {
  const outer = useThemeUI()
  context = context || outer

  const [theme, setTheme] = useReducer(reducer, context.theme)
  context.theme = theme
  context.setTheme = setTheme

  return (
    <EditorContext.Provider value={context}>
      <Emotion.Provider context={theme}>
        <div
          {...props}
          sx={{
            fontFamily: 'system-ui, sans-serif',
            fontSize,
            lineHeight: 1.5,
            fontWeight: 400,
            color,
            bg,
          }}
        />
      </Emotion.Provider>
    </EditorContext.Provider>
  )
}
