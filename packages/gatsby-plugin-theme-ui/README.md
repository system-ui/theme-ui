# gatsby-plugin-theme-ui

Gatsby plugin for adding theme-ui context

```sh
npm i theme-ui gatsby-plugin-theme-ui @emotion/core @mdx-js/react
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

To extend an existing theme, import the module and merge, assign or override properties in your shadowing `src/gatsby-plugin-theme-ui/index.js` file.

```js
// example with extending
import baseTheme from 'gatsby-plugin-theme-ui'

export default {
  ...baseTheme,
  // extending the colors only
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
// src/theme.js
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

MIT License
