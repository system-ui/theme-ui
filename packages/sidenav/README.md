# @theme-ui/sidenav

MDX-based sidebar navigation component

```sh
npm i @theme-ui/sidenav
```

Given an MDX document like this:

```md
- [Home](/)
- [About](/about)
- [Guides](/guides)
  - [Getting Started](/guides/getting-started)
  - [Gatsby](/guides/gatsby)
```

The MDX document can be styled as a sidebar navigation component.

```jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Sidenav } from '@theme-ui/sidenav'
import Links from './links.mdx'

export default props => (
  <Sidenav {...props}>
    <Links />
  </Sidenav>
)
```

Alternatively, an accordion style sidenav can be rendered using the `AccordionNav` component.

```jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { AccordionNav } from '@theme-ui/sidenav'
import Links from './links.mdx'

export default props => (
  <Links
    {...props}
    components={{
      wrapper: AccordionNav,
    }}
  />
)
```

The same MDX document can be used to create pagination links.
Pass in the current `pathname` to allow the `Pagination` component to determine the previous and next links.

```jsx
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Pagination } from '@theme-ui/sidenav'
import { Location } from '@reach/router'
import Links from './links.mdx'

export default props =>
  <Location
    children={({ location }) => (
      <Links
        pathname={location.pathname}
        components={{
          wrapper: Pagination
        }}
      />
    ))}
  />
```
