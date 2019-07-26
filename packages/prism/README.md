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

Please note that `@theme-ui/prism` uses [`prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer), [which does not include all languages supported in Prism](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js) by default. So, if you happen to use one of the missing languages, your code block simply won't show up as highlighted.

For example, to add support for the `R` language, import the language and pass a custom `Prism` instance to the `CodeBlock` component:
	
```js
import CodeBlock from '@theme-ui/prism'
import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-r'

<CodeBlock Prism={Prism} ... />
```

For further reading on theming your syntax highlighting
[see the Theme UI docs](https://theme-ui.com/theming/#syntax-highlighting).
