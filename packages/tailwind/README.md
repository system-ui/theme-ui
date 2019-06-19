# @theme-ui/tailwind

Generate static CSS for use outside of React with Theme UI and Tailwind.css.

## Why?

Though Theme UI comes with its own implementation, project constraints might require
pure utility CSS output. This library allows you to leverage a Theme UI theme that
is used elsewhere and transforms it to the configuration that Tailwind expects. The
best of both worlds.

## Installation

```sh
yarn add @theme-ui/tailwind
```

## Usage

Transform your Theme UI compliant theme config with the library:

```js
// tailwind.config.js
const toTailwind = require('@theme-ui/tailwind')
const theme = require('./theme') // Path to Theme UI config

module.exports = toTailwind(theme)
```

Then, use the Tailwind CLI:

```sh
tailwind build input.css -o output.css
```
