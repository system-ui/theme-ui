import { ThemeUIProvider, Container } from 'theme-ui'

export default (props) => (
  <ThemeUIProvider
    theme={{
      styles: {
        p: {
          maxWidth: '40em',
          my: 4,
        },
        h1: {
          fontSize: [3, 3, 4],
          letterSpacing: '0',
          my: 4,
        },
        a: {
          variant: 'links.button',
          mr: 3,
        },
      },
    }}
  >
    <div sx={{ pt: 4 }}>
      <Container>{props.children}</Container>
    </div>
  </ThemeUIProvider>
)
