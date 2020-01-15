# @theme-ui/editor

Components for editing Theme UI context, themes, and elements

## Theme Context Editing

```jsx
import React from 'react'
import {
  Editor,
  Row,
  Fonts,
  FontSizes,
  FontWeights,
  LineHeights,
  ColorMode,
  ColorPalette,
  Space,
} from '@theme-ui/editor'

export default props => (
  <Editor>
    <Fonts />
    <Row>
      <FontSizes />
    </Row>
    <Row>
      <FontWeights />
    </Row>
    <Row>
      <LineHeights />
    </Row>
    <ColorMode />
    <ColorPalette />
    <Row>
      <Space />
    </Row>
  </Editor>
)
```

## Manually passing context

Pass a Theme UI context manually to the `Editor` component when you don't want to edit the pages theming context.

```jsx
import React from 'react'
import { Editor, Fonts } from '@theme-ui/editor'
import merge from 'lodash.merge'

const reducer = (state, next) => merge({}, state, next)
const defaultTheme = {
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
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
import { Editor, StylesForm } from '@theme-ui/editor'

export default props => (
  <Editor>
    <code>theme.styles.h1</code>
    <StylesForm tag="h1" />
    <code>theme.styles.h2</code>
    <StylesForm tag="h2" />
  </Editor>
)
```

## `sx` editor

To edit arbitrary `sx` style objects, use the following forms:

```jsx
import React from 'react'
import { SxTypography, SxMargin, SxColors } from '@theme-ui/editor'
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
      <SxTypography value={style} onChange={setStyle} theme={theme} />
      <SxMargin value={style} onChange={setStyle} theme={theme} />
      <SxColors value={style} onChange={setStyle} theme={theme} />
    </div>
  )
}
```
