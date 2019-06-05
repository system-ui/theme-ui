
# gatsby-theme-ui

Gatsby (theme) plugin for adding theme-ui context

```sh
npm i theme-ui gatsby-theme-ui
```

```js
// gatsby-config.js
module.exports = {
  __experimentalThemes: [
    'gatsby-theme-ui',
  ],
  plugins: [],
}
```

## Customizing the theme

To customize the theme used in your Gatsby site, shadow files in a `src/gatsby-theme-ui/` directory.
The `src/gatsby-theme-ui/index.js` module is the main export for themes.

```js
// example src/gatsby-theme-ui/index.js
export default {
  colors: {
    text: '#111',
    background: '#fff',
  },
}
```

## Extending a theme

To extend an existing theme, import the module and merge, assign or override properties in your shadowing `src/gatsby-theme-ui/index.js` file.

```js
// example with extending
import baseTheme from 'gatsby-theme-ui'

export default {
  ...baseTheme,
  // extending the colors only
  colors: {
    ...baseTheme.colors,
    text: '#111',
    background: '#fff',
  }
}
```

MIT License
