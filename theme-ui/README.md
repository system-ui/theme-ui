
# theme-ui

Themeable UI components for themes

```sh
npm i theme-ui
```

```jsx
// basic usage
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

export default props =>
  <ThemeProvider theme={theme}>
    {props.children}
  </ThemeProvider>
```

## `css` prop

```jsx
// with css prop and @styled-system/css
import React from 'react'
import css from '@styled-system/css'

export default () =>
  <div
    css={css({
      fontSize: 4,
      fontWeight: 'bold',
      color: 'primary', // picks up values from theme
    })}>
    Hello
  </div>
```

## MDX Components

Use the `components` prop to add components to MDX scope.

```jsx
// with mdx components
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import mdxComponents from './mdx-components'
import theme from './theme'

export default props =>
  <ThemeProvider
    components={mdxComponents}
    theme={theme}>
    {props.children}
  </ThemeProvider>
```

This will render child MDX components with the components provided via context.

## Styled components

These components can also be consumed *outside* of an MDX doc with the `Styled` component.

```jsx
import React from 'react'
import { Styled } from 'theme-ui'

export default props =>
  <Styled.div>
    <Styled.h1>
      Hello
    </Styled.h1>
  </Styled.div>
```

## `theme.styles`

The MDX components can also be styled via the `theme.styles` object.

```js
// example theme
export default {
  colors: {
    primary: '#33e',
  },
  styles: {
    // this styles child MDX `<h1>` components
    h1: {
      fontSize: 32,
      // this value comes from the `color` object
      color: 'primary',
    },
  }
}
```

## Typography.js

The output of Typography.js can be added to the `theme.styles` object to style MDX content.

See the [Demo Page](/typography)

