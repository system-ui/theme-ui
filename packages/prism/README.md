# @theme-ui/prism

A syntax highlighting component based on
[prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)
that works seamlessly with Theme UI.

## Installation

```
npm i @theme-ui/prism
```

## Usage

The syntax highlighting component needs to be passed to Theme UI
context via the `ThemeProvider`.

```js
// src/components/layout.js
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import CodeBlock from '@theme-ui/prism'

import theme from './theme'

const components = {
  pre: ({ children }) => <>{children}</>,
  code: CodeBlock,
}

export default ({ children }) => (
  <ThemeProvider theme={theme} components={components}>
    {children}
  </ThemeProvider>
)
```

Then, all code blocks in MDX documents wrapped by Layout will be
syntax highlighted.

For further reading on theming your syntax highlighting
[see the Theme UI docs](https://theme-ui.com/theming/#syntax-highlighting).
