/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'

const theme = {
  '@theme-ui/editor': {
    input: {
      borderColor: 'rgba(0, 0, 0, .125)',
    },
  },
}

export default ({ fontSize = 16, color, bg, ...props }) => {
  return (
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
  )
}
