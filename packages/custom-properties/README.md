# @theme-ui/custom-properties

Generate CSS custom properties for use with Theme UI.

https://theme-ui.com

## Installation

```
npm i @theme-ui/custom-properties
```

## Usage

Transform your Theme UI compliant theme config with the library:

```js
const toCustomProperties = require('@theme-ui/custom-properties')
const theme = require('../theme')

module.exports = () => {
  const customProperties = toCustomProperties(theme, '🍭')

  return customProperties
}
```

## Parameters

The @theme-ui/custom-properties function takes two parameters:

```js
toCustomProperties($theme, $prefix)
```

1. theme - The theme ui specification object
1. prefix - An optional prefix for the css custom property _optional_
