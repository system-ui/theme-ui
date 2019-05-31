
# gatsby-plugin-theme-ui

```sh
npm i theme-ui gatsby-plugin-theme-ui
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

