# gatsby-theme-ui-layout

Gatsby theme for adding shadowable layouts to multiple Gatsby themes for
composition.

```sh
npm i gatsby-theme-ui-layout
```

In your theme, import and use the Layout component, which does not include any
default layout.

```jsx
// example page template
import { Layout } from 'gatsby-theme-ui-layout'

export default (props) => (
  <Layout {...props}>{/* your theme content goes here */}</Layout>
)
```

End-users of a theme that is built with `gatsby-theme-ui-layout` can shadow the
same Layout component to customize the page layout.
