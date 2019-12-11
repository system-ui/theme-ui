# @theme-ui/prism

A syntax highlighting component based on
[prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer)
that works seamlessly with Theme UI.

## Installation

```
npm i @theme-ui/prism
```

## Usage

The syntax highlighting component needs to be passed to Theme UI
context via the `ThemeProvider`.

```js
// src/components/layout.js
import React from 'react'
import { ThemeProvider } from 'theme-ui'
import Prism from '@theme-ui/prism'

import theme from './theme'

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
}

export default ({ children }) => (
  <ThemeProvider
    theme={theme}
    components={components}>
    {children}
  </ThemeProvider>
)
```

Then, all code blocks in MDX documents wrapped by Layout will be syntax highlighted.

### Gatsby Plugin

When using `gatsby-plugin-theme-ui`, shadow the `src/gatsby-plugin-theme-ui/components.js` module to add the Prism component to MDX scope.

```js
// src/gatsby-plugin-theme-ui/components.js
import Prism from '@theme-ui/prism'

export default {
  pre: props => props.children,
  code: Prism,
}
```

## Syntax Themes

This package includes the default syntax color themes from the `prismjs` and `prism-react-renderer` packages.
To add these to your Theme UI `theme` object, import a preset and add the styles to `theme.styles.code`.

```js
// theme.js
import nightOwl from '@theme-ui/prism/presets/night-owl.json'

export default {
  // ...theme
  styles: {
    code: {
      ...nightOwl,
    }
  }
}
```

The following themes are available and can be found in the [`presets/`](https://github.com/system-ui/theme-ui/tree/master/packages/prism/presets) directory.

- `dracula.json`
- `duotone-dark.json`
- `duotone-light.json`
- `github.json`
- `night-owl-light.json`
- `night-owl.json`
- `oceanic-next.json`
- `prism-coy.json`
- `prism-dark.json`
- `prism-funky.json`
- `prism-okaidia.json`
- `prism-solarizedlight.json`
- `prism-tomorrow.json`
- `prism-twilight.json`
- `prism.json`
- `shades-of-purple.json`
- `ultramin.json`
- `vs-dark.json`

### Theme UI Colors

To theme the prism styles based on the colors defined in your `theme.colors` object, use the `theme-ui` preset,
which will use the following color keys for syntax highlight.

- `gray`
- `primary`
- `secondary`
- `accent`

```js
// src/gatsby-plugin-theme-ui/index.js
import prism from '@theme-ui/prism/presets/theme-ui'

export default {
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#33e',
    secondary: '#119',
    accent: '#639',
    gray: '#666',
  },
  styles: {
    code: {
      ...prism,
    }
  }
}
```

## Additional Languages

Please note that `@theme-ui/prism` uses [`prism-react-renderer`](https://github.com/FormidableLabs/prism-react-renderer), [which does not include all languages supported in Prism](https://github.com/FormidableLabs/prism-react-renderer/blob/master/src/vendor/prism/includeLangs.js) by default. So, if you happen to use one of the missing languages, your code block simply won't show up as highlighted.

For example, to add support for the `R` language, import the language and pass a custom `Prism` instance to the Theme UI component:

```js
// src/gatsby-plugin-theme-ui/components.js
import React from 'react'
import ThemeUIPrism from '@theme-ui/prism'
import PrismCore from 'prismjs/components/prism-core'
import 'prismjs/components/prism-r'

export default {
  pre: props => props.children,
  code: props => <ThemeUIPrism {...props} Prism={PrismCore} />,
}
```

See the [Theme UI docs](https://theme-ui.com/theming/#syntax-highlighting) for more.

