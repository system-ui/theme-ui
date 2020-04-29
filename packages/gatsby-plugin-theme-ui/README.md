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

| Key                      | Default value    | Description                                                                      |
| ------------------------ | ---------------- | -------------------------------------------------------------------------------- |
| `themeModule`               | `null`            | JSON theme object, use the `require` syntax to include it in options. Make sure the package you're requiring is installed in your dependencies.               |
| `themeModulePath`            | `null`  | A string package name that the plugin will require for you. Make sure the package you're requiring is installed in your dependencies.                                                             |
| `moduleExportName`              | `default` | The name of the export from the theme module, applies to `themeModule` or `themeModulePath` resolution depending which one you're using    |
| `typographyTheme`              | `null` | The name of the typography theme you'd like to use. The available package names can be found in the [typography.js repo](https://github.com/KyleAMathews/typography.js/tree/master/packages). You'll need to install the package locally as well.     |

> Note that if your theme is exported at the top level, the `moduleExportName` of `default` is bypassed. See [theme-ui/preset-deep](https://github.com/system-ui/theme-ui/blob/master/packages/preset-deep/src/index.ts).

The theme module you include in options is considered your base theme. Any further customization and shadowing will be merged with it. 

### Using options

```js
// gatsby-config.js
module.exports = {
  plugins: [
    { resolve: 'gatsby-plugin-theme-ui',
      options: {
        themeModulePath: '@theme-ui/preset-funk'
        // or themeModule: require('@theme-ui/preset-funk')
      }
    }],
}
```

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

To enable support for multiple color modes, add a nested `modes` object to `theme.colors`.

```js
// src/gatsby-plugin-theme-ui/index.js
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
