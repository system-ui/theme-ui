# @theme-ui/tailwind

Generate static CSS for use outside of React with Theme UI and Tailwind.css.

## Why?

Though Theme UI comes with its own implementation, project constraints might require
pure utility CSS output. This library allows you to leverage a Theme UI theme that
is used elsewhere and transforms it to the configuration that Tailwind expects. The
best of both worlds.

## Installation

```
yarn add theme-ui-tailwind
```

## Usage

```js
// tailwind.config.js
const toTailwind = require('theme-ui-tailwind')

const theme = {}

module.exports = toTailwind(theme)
```
