⚠ _This package is no longer maintained as its dependencies (postcss-rtl) are
not maintained. Feel free to copy the code to your project — it's just 44 LoC._
⚠

---

# @theme-ui/tachyons

Generate static CSS for use outside of React with Theme UI and Tachyons.

## Why?

Though Theme UI comes with its own implementation, project constraints might
require pure utility CSS output. This library allows you to leverage a Theme UI
theme that is used elsewhere and transforms it to the configuration that
Tachyons expects. The best of both worlds.

## Installation

```
npm i @theme-ui/tachyons
```

## Usage

Transform your Theme UI compliant theme config with the library:

```js
// scripts/generate-tachyons-css.js
const toTachyons = require('@theme-ui/tachyons')
const tachyonsGenerator = require('tachyons-generator')
const theme = require('../theme')

module.exports = async () => {
  const { css } = await tachyonsGenerator(toTachyons(theme)).generate()

  return css
}
```
