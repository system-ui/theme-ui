
# theme-ui

**WIP** Themeable UI components for themes

[![Build Status][circleci-badge]][circleci]
[![Version][version]][npm]

[circleci]: https://circleci.com/gh/system-ui/theme-ui
[circleci-badge]: https://flat.badgen.net/circleci/github/system-ui/theme-ui
[version]: https://flat.badgen.net/npm/v/theme-ui
[npm]: https://npmjs.com/package/theme-ui

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

The `css` utility is from [@styled-system/css](https://styled-system.com/css/).
This could potentially be handled with something like [Emotion plugins](https://github.com/emotion-js/emotion/pull/1299).

```jsx
import React from 'react'
import { css } from 'theme-ui'

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

## Custom Pragma (experimental)

To avoid manually importing and calling the `css` prop, a custom pragma can be used instead.
This custom pragma converts a Styled System-aware `css` prop into a styled object and passes it to the Emotion `jsx` pragma.
This is a complete replacement for the Emotion custom pragma.

```jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props =>
  <div
    {...props}
    css={{
      color: 'white',
      bg: 'primary',
    }}
  />
```

The custom pragma also accepts space props for margin and padding.

```jsx
<div mx='auto' p={4} />
```

## MDX Components

Use the `components` prop to add components to MDX scope.
The `ThemeProvider` (name TBD) is a combination of `MDXProvider` and Emotion's `ThemeProvider`.

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

This will render child MDX documents with the components provided via context.
For use outside of MDX (e.g. Remark Markdown) the styles could be applied with a wrapper component.

## `theme.styles`

The MDX components can also be styled via the `theme.styles` object.
This can be used as a mechanism to pass Typography.js-like styles to MDX content.

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

## Styled components

These components' styles can also be consumed *outside* of an MDX doc with the `Styled` component.
Note that these are only *styled* using the same `theme.styles` object and *not* the same components passed to the `ThemeProvider` context.

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

To change the underlying component in `Styled`, use the `as` prop.

```jsx
<Styled.a as={Link} to='/'>Home</Styled.a>
```

## Layout Components

Page layout components are included in the `theme-ui/layout` module.

```jsx
import React from 'react'
import {
  Layout,
  Header,
  Main,
  Container,
  Footer
} from 'theme-ui/layout'

export default props =>
  <Layout>
    <Header>
      Hello
    </Header>
    <Main>
      <Container>
        {props.children}
      </Container>
    </Main>
    <Footer>
      © 2019
    </Footer>
  </Layout>
```

## Box & Flex

The `Box` & `Flex` layout components are similar to the ones found in [Rebass](https://rebassjs.org), but are built with Emotion and `@styled-system/css`.

```jsx
import React from 'react'
import { Flex, Box } from 'theme-ui/layout'

export default props =>
  <Flex flexWrap='wrap'>
    <Box width={[ 1, 1/2 ]} />
    <Box width={[ 1, 1/2 ]} />
  </Flex>
```

## Experimental

- [Live Demo](https://theme-ui.now.sh/demo)
- [Typography.js Demo](https://theme-ui.now.sh/typography)

MIT License
