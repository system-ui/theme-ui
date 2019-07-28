# @theme-ui/css-variables

Generate CSS variables for use with Theme UI.


## Installation

```
yarn add @theme-ui/css-variables
```

## Usage

Transform your Theme UI compliant theme config with the library:

```js
const toCssVariables = require('@theme-ui/tachyons')
const theme = require('../theme');

module.exports = async () => {
  const cssVariables = await toCssVariables(theme)

  return cssVariables
}
```
