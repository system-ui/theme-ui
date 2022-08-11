# @theme-ui/mdx

MDX utilities for Theme UI

https://theme-ui.com

```sh
npm i @theme-ui/mdx
```

## API

### `useThemedStylesWithMdx`

Wraps an object of components provided to `MDXProvider` with styles from
`theme.styles`.

_example usage:_

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

Use the `Themed` components dict to render UI with styles from
[`theme.styles`](https://theme-ui.com/theming#styles) _outside_ of MDX. Useful
for consistent styling in components meant for embedding in MDX.

For example, if you'd like to reuse heading styles in a React component, you can
use the `Themed.h1` component to render an `<h1>` element with styles from
`theme.styles.h1`.

```tsx
import type { ComponentPropsWithoutRef } from 'react'
import { Themed } from '@theme-ui/mdx'

const createHeadingWithLink =
  (Level: 'h2' | 'h3' | 'h4' | 'h5' | 'h6') =>
  (props: ComponentPropsWithoutRef<'h2'>) =>
    (
      <Level {...props}>
        {props.id && (
          <a
            href={`#${props.id}`}
            sx={{
              color: 'inherit',
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {props.children}
          </a>
        )}
      </Level>
    )

export const components = {
  h2: createHeadingWithLink('h2'),
  h3: createHeadingWithLink('h3'),
  h4: createHeadingWithLink('h4'),
  h5: createHeadingWithLink('h5'),
  h6: createHeadingWithLink('h6'),
}
```

---

**Other exports**

- `themed`
- `defaultMdxComponents`
