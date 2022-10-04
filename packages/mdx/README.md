# @theme-ui/mdx

[MDX](https://mdxjs.com) utilities for [Theme UI](https://theme-ui.com)

```sh
npm i @theme-ui/mdx
```

## API

### `useThemedStylesWithMdx`

Wraps an object of components provided to `MDXProvider` with styles from
`theme.styles`.

**Example usage:**

```tsx
import {
  MDXProvider,
  useMDXComponents,
  Components as MDXComponents,
  MergeComponents as MergeMDXComponents,
} from '@mdx-js/react'
import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import { ThemeProvider, Theme } from 'theme-ui'

interface MyProviderProps {
  theme: Theme
  components?: MDXComponents | MergeMDXComponents
  children: React.ReactNode
}
function MyProvider({ theme, components, children }: MyProviderProps) {
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components)
  )

  return (
    <ThemeProvider theme={theme}>
      <MDXProvider components={componentsWithStyles}>{children}</MDXProvider>
    </ThemeProvider>
  )
}
```

### `Themed`

Use the [`Themed` components dictionary](https://theme-ui.com/mdx/themed) to
render UI with styles from [`theme.styles`](https://theme-ui.com/theming#styles)
_outside_ of MDX. These are primarily meant as a mechanism to use styles defined
in a `theme` object outside of MDX, which can then be embedded in JSX>

```jsx
// picks up styles from `theme.styles.h1`
<Themed.h1 />
```

If you’re looking to automatically hyperlink headings in MDX, check out the
[linked headings guide](https://theme-ui.com/mdx/linked-headings).)

---

**Other exports**

- `themed`
- `defaultMdxComponents`
