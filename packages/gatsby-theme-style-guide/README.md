
# gatsby-theme-style-guide

Automatically generate a style guide page based on your Theme UI configuration, built with [`@theme-ui/style-guide`](https://theme-ui.com/style-guide).

```sh
npm i gatsby-theme-style-guide
```

```js
// gatsby-config.js
module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    'gatsby-theme-style-guide',
  ]
}
```

This theme will create a page at `/style-guide` that includes typographic styles and colors based on your theme.

## Options

```js
module.exports = {
  plugins: [
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-theme-style-guide',
      options: {
        // sets path for generated page
        basePath: '/design-system',
      }
    },
  ]
}
```

## Shadowing

Shadow the following components to customize the layout and order of the page.

component | description
---|---
`src/template.js` | the root component for the page
`src/layout.js` | wrapper for adding a page layout
`src/header.js` | header for the top of the page
`src/typography.js` | section for typography styles
`src/colors.js` | section for colors

