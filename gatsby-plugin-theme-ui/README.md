
# gatsby-plugin-theme-ui

Adds the Theme UI ThemeProvider context to Gatsby themes and sites, deeply merging them into a single context.

```sh
npm i gatsby-plugin-theme-ui
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
  ]
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

<!--
```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        // required
        theme: require.resolve('./src/theme.js'),
        // optional
        components: require.resolve('./src/components.js'),
        // optional, initial color mode
        initialColorMode: 'light',
      }
    }
  ]
}
```
-->
