# @theme-ui/css

[![Minified Size on Bundlephobia](https://badgen.net/bundlephobia/minzip/@theme-ui/css)](https://bundlephobia.com/package/@theme-ui/css)

`@theme-ui/css` contains the framework-agnostic core logic of Theme UI. It lets
you write style objects with responsive, theme-aware ergonomic shortcuts.

```sh
npm i @theme-ui/css @emotion/react
```

## Usage

```js
import { css as transformStyleObject } from '@theme-ui/css'
import { css as createClassName } from '@emotion/css'

const root = document.getElementById('root')

/** @type {import("@theme-ui/css").Theme} */
const theme = {
  colors: {
    text: '#222',
  },
  fonts: {
    mono: 'monospace',
  },
  space: {
    sm: '1rem',
    md: '2rem',
  },
}

const styles = transformStyleObject({
  padding: ['sm', 'md'],
  border: ({ colors }) => `2px solid ${colors.text}`,
  h1: {
    fontFamily: 'mono',
    color: 'text',
  },
})(theme)

root.classList.add(createClassName(styles))
root.innerHTML = `
<h1>You can use <code>@theme-ui/css</code> in Vanilla JS!</h1>
`
```

[See the snippet above on CodeSandbox](https://codesandbox.io/s/theme-ui-css-framework-agnostic-2c0ue?file=/src/index.js)
