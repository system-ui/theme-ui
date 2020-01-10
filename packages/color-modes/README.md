
# @theme-ui/color-modes

Adds support for user-controlled color modes

https://theme-ui.com

**Note:** *This package is included in the main `theme-ui` package, and generally should not be used on its own.*

```sh
npm i @theme-ui/color-modes
```

```jsx
import { ThemeProvider } from '@theme-ui/core'
import { ColorModeProvider } from '@theme-ui/color-modes'
import theme from './theme'

export default props =>
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      {props.children}
    </ColorModeProvider>
  </ThemeProvider>
```

## API

- `useColorMode`
- `ColorModeProvider`
- `InitializeColorMode`

