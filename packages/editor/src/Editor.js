/** @jsx jsx */
import { jsx, ThemeProvider, useThemeUI } from 'theme-ui'
import { EditorContext } from './context'

const theme = {
  '@theme-ui/editor': {
    input: {
      borderColor: 'rgba(0, 0, 0, .125)',
    },
    select: {
      borderColor: 'rgba(0, 0, 0, .125)',
    },
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
      <ThemeProvider theme={theme}>
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
