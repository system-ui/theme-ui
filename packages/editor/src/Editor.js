/** @jsx jsx */
import { jsx, ThemeProvider, useThemeUI } from 'theme-ui'
import { useEffect } from 'react'
import { EditorContext } from './context'

const theme = {
  colors: {
    primary: 'hsl(210, 100%, 40%)',
    highlight: 'hsl(210, 50%, 95%)',
  },
}

export default ({
  context,
  fontSize = 16,
  color,
  bg,
  ...props
}) => {
  const outer = useThemeUI()
  context = context || outer

  return (
    <EditorContext.Provider value={context}>
      <ThemeProvider scoped theme={theme}>
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
      </ThemeProvider>
    </EditorContext.Provider>
  )
}
