<img src='https://raw.githubusercontent.com/system-ui/theme-ui/master/packages/docs/static/icon.png' width='64' heigh='64' />

# Theme UI

Build consistent, themeable React UIs based on design system constraints and design tokens

[![GitHub][github-badge]][github]
[![Build Status][circleci-badge]][circleci]
[![Version][version]][npm]
![MIT License][license]
[![system-ui/theme][system-ui-badge]](https://system-ui.com/theme)
![][size]

https://theme-ui.com

[github]: https://github.com/system-ui/theme-ui
[github-badge]: https://flat.badgen.net/badge/-/github?icon=github&label
[circleci]: https://circleci.com/gh/system-ui/theme-ui
[circleci-badge]: https://flat.badgen.net/circleci/github/system-ui/theme-ui/master
[version]: https://flat.badgen.net/npm/v/theme-ui
[npm]: https://npmjs.com/package/theme-ui
[license]: https://flat.badgen.net/badge/license/MIT/blue
[system-ui-badge]: https://flat.badgen.net/badge/system-ui/theme/black
[size]: https://flat.badgen.net/bundlephobia/minzip/theme-ui

- Style your application consistently with a global theme object and customizable design tokens
- Style [MDX][] content with themes
- Follows the [Theme Specification][] for interoperability with other libraries
- Style elements directly with the `css` prop and [@styled-system/css][]
- Works with or without custom styled components and [Styled System][]
- First-class support for [Typography.js][] themes
- First-class support for dark mode and other color modes
- Use contextual theming for nested stylistic changes
- Primitive page layout components
- Keep styles isolated with [Emotion][]

[emotion]: https://emotion.sh
[mdx]: https://mdxjs.com
[styled system]: https://styled-system.com
[@styled-system/css]: https://styled-system.com/css
[theme specification]: https://system-ui.com/theme
[typography.js]: https://github.com/KyleAMathews/typography.js

## Getting Started

```sh
npm i theme-ui
```

Theme UI also requires the following dependencies

```sh
npm i @emotion/core @emotion/styled @mdx-js/react
```

Wrap your application with the `ThemeProvider` component and pass in a custom `theme` object.

```jsx
// basic usage
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import theme from './theme'

export default props => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)
```

The `theme` object should follow the System UI [Theme Specification][],
which lets you define custom color palettes, typographic scales, fonts, and more.

```js
// example theme.js
export default {
  fonts: {
    body: 'system-ui, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
  },
}
```

## `css` prop

Use the `css` prop throughout your application, along with the `css` utility to pick up values from the theme.
Using the `css` utility means that
color and other values can reference values defined in `theme` object.

```jsx
import React from 'react'
import { css } from 'theme-ui'

export default () => (
  <div
    css={css({
      fontWeight: 'bold',
      fontSize: 4, // picks up value from `theme.fontSizes[4]`
      color: 'primary', // picks up value from `theme.colors.primary`
    })}
  >
    Hello
  </div>
)
```

Read more about the `css` utility in the [@styled-system/css](https://styled-system.com/css/) docs.

## Responsive styles

The `css` utility also supports using arrays as values to change properties responsively with a mobile-first approach.

```jsx
import React from 'react'
import { css } from 'theme-ui'

export default props => (
  <div
    css={css({
      // applies width 100% to all viewport widths,
      // width 50% above the first breakpoint,
      // and 25% above the next breakpoint
      width: ['100%', '50%', '25%'],
    })}
  />
)
```

## `jsx` pragma

To use values from the `theme` object without importing the `css` utility, use the custom `jsx` pragma, which will automatically convert Theme UI `css` prop values.

```jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => (
  <div
    css={{
      fontSize: 4,
      color: 'primary',
      bg: 'lightgray',
    }}
  />
)
```

Read more in the [custom pragma docs](https://theme-ui.com/custom-pragma).

## MDX Components

Use the `components` prop to add components to MDX scope.
This can be used to introduce new behavior to markdown elements in MDX, such as adding linked headings or live-editable code examples.
Internally, the `ThemeProvider` is a combination of `MDXProvider` and Emotion's `ThemeProvider`.

```jsx
// with mdx components
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import mdxComponents from './mdx-components'
import theme from './theme'

export default props => (
  <ThemeProvider components={mdxComponents} theme={theme}>
    {props.children}
  </ThemeProvider>
)
```

## `theme.styles`

The MDX components can also be styled via the `theme.styles` object.
This can be used as a mechanism to pass in fully-baked themes and typographic styles to MDX content.

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
  },
}
```

## Styled components

These components' styles can also be consumed _outside_ of an MDX doc with the `Styled` component.
Note that these are only _styled_ using the same `theme.styles` object and _not_ the same components passed to the `ThemeProvider` context.

```jsx
import React from 'react'
import { Styled } from 'theme-ui'

export default props => (
  <Styled.div>
    <Styled.h1>Hello</Styled.h1>
  </Styled.div>
)
```

To change the underlying component in `Styled`, use the `as` prop.

```jsx
<Styled.a as={Link} to="/">
  Home
</Styled.a>
```

## Layout Components

Theme UI includes several components for creating page layouts.

- `Layout`: sets a flex column with 100vh min-height
- `Header`: flexbox row
- `Footer`: flexbox row
- `Main`: flex auto container for pushing the Footer to the bottom of the viewport
- `Container`: max-width, centered container

```jsx
import React from 'react'
import { Layout, Header, Main, Container, Footer } from 'theme-ui'

export default props => (
  <Layout>
    <Header>Hello</Header>
    <Main>
      <Container>{props.children}</Container>
    </Main>
    <Footer>© 2019</Footer>
  </Layout>
)
```

## Box & Flex

The `Box` & `Flex` layout components are similar to the ones found in [Rebass](https://rebassjs.org), but are built with Emotion and `@styled-system/css`.

```jsx
import React from 'react'
import { Flex, Box } from 'theme-ui'

export default props => (
  <Flex flexWrap="wrap">
    <Box width={[1, 1 / 2]} />
    <Box width={[1, 1 / 2]} />
  </Flex>
)
```

## More Documentation

- [Theming](https://theme-ui.com/theming)
- [Layout](https://theme-ui.com/layout)
- [Color Modes](https://theme-ui.com/color-modes)
- [Gatsby Plugin](https://theme-ui.com/gatsby-plugin)
- [Custom Pragma](https://theme-ui.com/custom-pragma)
- [Typography.js](https://theme-ui.com/typography)

[typography demo]: https://theme-ui.com/typography
[demo]: https://theme-ui.com/demo
[emotion plugins]: https://github.com/emotion-js/emotion/pull/1299

MIT License
