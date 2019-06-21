# gatsby-plugin-theme-ui

**EXPERIMENTAL**

See [gatsby-theme-ui](https://github.com/system-ui/theme-ui/tree/master/packages/gatsby-theme-ui) for the currently recommended package.

Automatically adds Theme UI context to a Gatsby site or theme

```sh
npm i theme-ui gatsby-plugin-theme-ui
```

```js
// gatsby-config.js
module.exports = {
  plugins: ['gatsby-plugin-theme-ui'],
}
```

Add a `src/theme.js` file to your site to add values to the theme context.

```js
// src/theme.js
export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: 'tomato',
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
