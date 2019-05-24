
# gatsby-plugin-theme-ui

Adds the Theme UI ThemeProvider context to Gatsby themes and sites, deeply merging them into a single context.

```sh
npm i gatsby-plugin-theme-ui
```

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
        colorMode: 'light',
      }
    }
  ]
}
```
