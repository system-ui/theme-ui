# @theme-ui/editor

Components for editing Theme UI context, themes, and elements

```sh
npm i @theme-ui/editor
```

## Theme Context Editing

Add the `EditorProvider` to the root of your application, inside Theme UI's `ThemeProvider`.
This creates a stateful theme context for the editor form controls to use.

```jsx
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import { EditorProvider } from '@theme-ui/editor'

export default props =>
  <ThemeProvider theme={theme}>
    <EditorProvider>
      {props.children}
    </EditorProvider>
  </ThemeProvider>
```

Anywhere inside your app, add theme editor form controls.

```jsx
import React from 'react'
import { Theme } from '@theme-ui/editor'

export default props =>
  <div>
    <Theme.Fonts />
    <Theme.FontSizes />
    <Theme.FontWeights />
    <Theme.LineHeights />
    <Theme.Colors />
    <Theme.Space />
  </div>
```

The `EditorProvider` component also accepts a `theme` prop for usage without the `ThemeProvider` component's context.

## `theme.styles`

Use the `Styles` components to edit an element in `theme.styles`

```jsx
import React from 'react'
import { Styles } from '@theme-ui/editor'

export default props =>
  <>
    <code>theme.styles.h1</code>
    <Styles tag='h1' />
    <code>theme.styles.h2</code>
    <Styles tag='h2' />
  </>
```

## `sx` prop editor

To edit arbitrary `sx` style objects, use the `Sx` components:

```jsx
import React from 'react'
import { Sx } from '@theme-ui/editor'
import { useReducer } from 'react'
import merge from 'lodash.merge'
import theme from './theme'

const reducer = (state, next) => merge({}, state, next)

export default props => {
  const [style, setStyle] = useReducer(reducer, {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    color: 'tomato',
  })

  return (
    <div>
      <Sx.Typography
        value={style}
        onChange={setStyle}
        theme={theme}
      />
      <Sx.Margin
        value={style}
        onChange={setStyle}
        theme={theme}
      />
      <Sx.Colors
        value={style}
        onChange={setStyle}
        theme={theme}
      />
    </div>
  )
}
```
