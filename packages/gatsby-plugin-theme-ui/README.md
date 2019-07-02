# gatsby-plugin-theme-ui

Gatsby plugin for adding theme-ui context

```sh
npm i theme-ui gatsby-plugin-theme-ui @emotion/core @mdx-js/react @theme-ui/presets
```

```js
// gatsby-config.js
module.exports = {
  plugins: ['gatsby-plugin-theme-ui'],
}
```

## Customizing the theme

To customize the theme used in your Gatsby site, shadow files in a `src/gatsby-plugin-theme-ui/` directory.
The `src/gatsby-plugin-theme-ui/index.js` module is the main export for themes.

```js
// example src/gatsby-plugin-theme-ui/index.js
export default {
  colors: {
    text: '#111',
    background: '#fff',
  },
}
```

## Extending a theme

To extend an existing theme, import the [presets](https://theme-ui.com/presets) module by running `npm i @theme-ui/presets` then merge, assign or override properties in your shadowing `src/gatsby-plugin-theme-ui/index.js` file.

```js
// example with extending
import { base } from '@theme-ui/presets'

export default {
  ...base,
  // extending the colors only
  colors: {
    ...base.colors,
    text: '#111',
    background: '#fff',
  },
}
```

To extend a theme in another Gatsby theme built with Theme UI, this same approach will work.

```js
// example extending from a Gatsby theme
import baseTheme from 'gatsby-theme-blog/src/gatsby-plugin-theme-ui'

export default {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    text: '#111',
    background: '#fff',
  },
}
```

## Color Modes

To enable support for multiple color modes, add an `initialColorMode` field to your `theme.js` object.

```js
// src/gatsby-plugin-theme-ui/index.js
export default {
  initialColorMode: 'light',
  colors: {
    text: '#000',
    background: '#fff',
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
      },
    },
  },
}
```

## Components

Custom MDX components that will receive styles from the theme can be included by adding a `src/gatsby-plugin-theme-ui/components.js` module.

```js
// example src/gatsby-plugin-theme-ui/components.js
export default {
  h1: props => (
    <h1 {...props}>
      <a href={`#${props.id}`}>{props.children}</a>
    </h1>
  ),
}
```

MIT License
