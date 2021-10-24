# @theme-ui/match-media

React hooks for referencing theme-ui breakpoints.

```sh
npm i @theme-ui/match-media
```

## Usage

This package provides two React hooks `useResponsiveValue` and `useBreakpointIndex` for referencing responsive values outside of the `sx` prop.
Note that this is a client-side-only, JavaScript solution.

```js
import { useResponsiveValue, useBreakpointIndex } from '@theme-ui/match-media'

const MyComponent = () => {
  // Return literal values:
  const color = useResponsiveValue(['red', 'green', 'blue'])
  // Or provide a function to access theme values:
  const themeColor = useResponsiveValue((theme) => [
    theme.colors.red,
    theme.colors.green,
    theme.colors.blue,
  ])
  // `useBreakpointIndex` returns the index of the currently matched media query:
  const index = useBreakpointIndex()

  return (
    <div>
      The current color is: {color}, and the current index is: {index}
    </div>
  )
}
```

### Server side rendering

Each hook also accepts an options object, used to set a default breakpoint index when rendering on the server.

```js
import { useResponsiveValue, useBreakpointIndex } from '@theme-ui/match-media'

const MyComponent = () => {
  const color = useResponsiveValue(['red', 'green', 'blue'], {
    defaultIndex: 1,
  })
  const index = useBreakpointIndex({ defaultIndex: 0 })

  return (
    <div>
      The current color is: {color}, and the current index is: {index}
      // Gatsby will output: // The current color is: green, and the current index
      is: 0
    </div>
  )
}
```

Each hook uses `breakpoints[0]` by default, if not specified.

```js
import { useResponsiveValue, useBreakpointIndex } from '@theme-ui/match-media'

const MyComponent = () => {
  const color = useResponsiveValue(['red', 'green', 'blue'])
  const index = useBreakpointIndex()

  return (
    <div>
      The current color is: {color}, and the current index is: {index}
      // Gatsby will output: // The current color is: red, and the current index
      is: 0
    </div>
  )
}
```
