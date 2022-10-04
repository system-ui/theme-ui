# @theme-ui/core

[![Minified Size on Bundlephobia](https://badgen.net/bundlephobia/minzip/@theme-ui/core)](https://bundlephobia.com/package/@theme-ui/core)

`@theme-ui/core` provides minimal React support for lightweight usage.

```sh
npm i @theme-ui/core @emotion/react
```

## Usage

```js
/** @jsxImportSource @theme-ui/core */

import { ThemeProvider } from '@theme-ui/core'

export function App() {
  return (
    <ThemeProvider theme={{ colors: { primary: '#33e' } }}>
      <h1 sx={{ color: 'primary' }}>Hello</h1>
    </ThemeProvider>
  )
}
```

If you already use `theme-ui` package, the batteries-included version of Theme
UI, you don't need to install `@theme-ui/core` separately — it's already in your
node_modules, and `theme-ui` reexports everything from it.

## API

- `jsx` — JSX function to create React elements supporting `sx` prop
- `ThemeProvider` — a [context provider](https://reactjs.org/docs/context.html)
- `useThemeUI` — a hook to access your theme
- `merge` — an utility function to deeply merge themes together

Note that `@theme-ui/core` doesn’t add global or root styles to
`<html>`/`<body>`. Refer to the
[Global Styles docs](https://theme-ui.com/guides/global-styles) for how to add
global styles.

## JSX Runtime

As `@theme-ui/core` defines `jsx` function and types for it, you can use it to
configure JSX runtime without installing `theme-ui` package.

### Entry point `/jsx-runtime`

- `jsx`
- `jsxs`

### Entry point `/jsx-dev-runtime`

- `jsxDEV`
