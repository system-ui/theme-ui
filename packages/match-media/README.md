# @theme-ui/match-media

React hooks for referencing theme-ui breakpoints.

## Overview

This package provides two React hooks (`useResponsiveValue` and `useBreakpointIndex`) for referencing responsive values outside of the `sx` prop.

## Installation

```sh
yarn add @theme-ui/match-media
```

## Usage

```js
import { useResponsiveValue, useResponsiveIndex } from '@theme-ui/match-media'

const MyComponent = () => {
  // Return literal values:
  const color = useResponsiveValue(['red', 'green', 'blue'])
  // Or provide a function to access theme values:
  const themeColor = useResponsiveValue(theme => [
    theme.colors.red,
    theme.colors.green,
    theme.colors.blue,
  ])
  // `useResponsiveIndex` returns the index of the currently matched media query:
  const index = useResponsiveIndex()

  return (
    <div>
      The current color is: {color}, and the current index is: {index}
    </div>
  )
}
```
