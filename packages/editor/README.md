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

## Manually passing context

Alternatively, you can pass a theme object to the...

Pass a theme object manually to the `EditorProvider` component when you don't want to edit the pages theming context.

```jsx
import React from 'react'
import {
  Editor,
  Fonts,
} from '@theme-ui/editor'
import merge from 'lodash.merge'

const reducer = (state, next) => merge({}, state, next)
const defaultTheme = {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'Georgia, serif',
  },
}

export default props => {
  const [theme, setTheme] = useReducer(reducer, defaultTheme)
  const context = {
    theme,
    setTheme,
  }

  return (
    <Editor context={context}>
      <Fonts />
    </Editor>
  )
}
```

## `theme.styles`

Use these components to edit an element in `theme.styles`

```jsx
import React from 'react'
import {
  Editor,
  StylesForm,
} from '@theme-ui/editor'

export default props =>
  <Editor>
    <code>theme.styles.h1</code>
    <StylesForm tag='h1' />
    <code>theme.styles.h2</code>
    <StylesForm tag='h2' />
  </Editor>
```

## `sx` editor

To edit arbitrary `sx` style objects, use the following forms:

```jsx
import React from 'react'
import {
  SxTypography,
  SxMargin,
  SxColors,
} from '@theme-ui/editor'
import { useReducer } from 'react'
import merge from 'lodash.merge'
import theme from './theme'

const reducer = (state, next) => merge({}, state, next)

export default props => {
  const [style, setStyle] = useReducer(reducer, {
    fontFamily: 'system-ui, sans-serif',
    color: 'tomato',
  })

  return (
    <div>
      <SxTypography
        value={style}
        onChange={setStyle}
        theme={theme}
      />
      <SxMargin
        value={style}
        onChange={setStyle}
        theme={theme}
      />
      <SxColors
        value={style}
        onChange={setStyle}
        theme={theme}
      />
    </div>
  )
}
```

---

```jsx
import {
  EditorProvider,
  Theme,
  Styles,
  Sx,
} from '@theme-ui/editor'

<EditorProvider>
  <Theme.Colors />
  <Theme.Fonts />
  <Theme.FontSizes />
  <Theme.FontWeights />
  <Theme.Space />
</EditorProvider>

<Styles tag='h1' />

<Sx.Padding />
<Sx.Margin />
<Sx.Space />
<Sx.Typography />
<Sx.Colors />
```
