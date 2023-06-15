# @theme-ui/typography

Utilities for integrating Typography.js themes with Theme UI

```js
import { ThemeUIProvider } from 'theme-ui'
import { toTheme } from '@theme-ui/typography'
import wordpress2016 from 'typography-theme-wordpress-2016'

const theme = toTheme(wordpress2016)

export default (props) => (
  <ThemeUIProvider theme={theme}>{props.children}</ThemeUIProvider>
)
```
