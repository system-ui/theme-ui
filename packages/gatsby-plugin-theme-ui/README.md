# gatsby-plugin-theme-ui

Gatsby plugin for adding Theme UI context

```sh
npm i theme-ui gatsby-plugin-theme-ui @emotion/core @mdx-js/react
```

```js
// gatsby-config.js
module.exports = {
  plugins: ['gatsby-plugin-theme-ui'],
}
```

In addition to providing context, this plugin will also
prevent a flash of unstyled colors when using color modes.

It **does not** apply default typographic styles in your application. See the [`Styled.root` docs](https://theme-ui.com/styled#styledroot) for how to handle base typographic styles.

## Customizing the theme

To customize the theme used in your Gatsby site,
shadow the `src/gatsby-plugin-theme-ui/index.js` module.

```js
// src/gatsby-plugin-theme-ui/index.js
export default {
  colors: {
    text: '#111',
    background: '#fff',
  },
}
```

## Extending a theme

To extend a Gatsby theme that uses Theme UI, import the base theme and export a new theme object.

```js
// src/gatsby-plugin-theme-ui/index.js
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

You can also import and use presets from [@theme-ui/presets](https://theme-ui.com/presets) to use as a starting point.

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
// src/gatsby-plugin-theme-ui/components.js
export default {
  h1: props => (
    <h1 {...props}>
      <a href={`#${props.id}`}>{props.children}</a>
    </h1>
  ),
}
```

MIT License
