# gatsby-plugin-theme-ui

Gatsby plugin for adding Theme UI context

```sh
npm i theme-ui gatsby-plugin-theme-ui
```

```js
// gatsby-config.js
module.exports = {
  plugins: ['gatsby-plugin-theme-ui'],
}
```

In addition to providing context, this plugin will also
prevent a flash of unstyled colors when using color modes.

## Options

| Key           | Default value | Description                                                                                                                                                                                                                                        |
| ------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prismPreset` | `null`        | The name of the preset you'd like to use to style code blocks inside your markdown files. The available presets can be found in the [theme-ui docs](https://theme-ui.com/packages/prism/). You can also use a package string of your own choosing. |
| `preset`      | `null`        | This can be a JSON theme object or a string package name. Make sure the package you're requiring is installed in your dependencies.                                                                                                                |

> Note that this plugin assumes the theme object is exported as `default`.

The theme module you include in options is considered your base theme. Any further customization and shadowing will be merged with it.

### Using options

```js
// gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        prismPreset: 'night-owl',
        preset: '@theme-ui/preset-funk',
      },
    },
  ],
}
```

## Customizing the theme

To customize the theme used in your Gatsby site,
shadow the `src/gatsby-plugin-theme-ui/index.js` module.

```js filename=src/gatsby-plugin-theme-ui/index.js
export default {
  colors: {
    text: '#111',
    background: '#fff',
  },
}
```

### Load theme from custom path

If you prefer to load your theme from a custom path (instead of the standard `src/gatsby-plugin-theme-ui/index.js`),
you can require it in your `gatsby-config.js` file:

```js filename=gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: 'gatsby-plugin-theme-ui',
      options: {
        preset: require('./src/theme'),
      },
    },
  ],
}
```

Note that `gatsby-config.js` does not support ES6 modules, so you should use `module.exports` in your theme file:

```js filename=src/theme.js
module.exports = {
  colors: {
    text: '#111',
    background: '#fff',
  },
}
```

## Extending a theme

To extend a Gatsby theme that uses Theme UI, import the base theme and export a new theme object.

```js filename=src/gatsby-plugin-theme-ui/index.js
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

You can also import and use presets from [@theme-ui/presets](https://theme-ui.com/packages/presets) to use as a starting point.

## Color Modes

To enable support for multiple color modes, add a nested `modes` object to `theme.colors`.

```js filename=src/gatsby-plugin-theme-ui/index.js
export default {
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

```js filename=src/gatsby-plugin-theme-ui/components.js
export default {
  h1: (props) => (
    <h1 {...props}>
      <a href={`#${props.id}`}>{props.children}</a>
    </h1>
  ),
}
```

MIT License
