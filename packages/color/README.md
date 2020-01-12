
# @theme-ui/color

Color manipulation utilities for Theme UI

```sh
npm i @theme-ui/color
```

Import utilities from the `@theme-ui/color` package and use them with colors in the `sx` prop.

```js
/** @jsx jsx */
import { jsx } from 'theme-ui'
import { darken, lighten } from '@theme-ui/color'

export default props =>
  <div
    {...props}
    sx={{
      color: darken('primary', .25),
      bg: lighten('primary', .875),
    }}
  />
```

## API

### `darken`

Darken a color by an amount 0–1

```js
import { darken } from '@theme-ui/color'
// darken('primary', amount)
```

### `lighten`

Lighten a color by an amount 0–1

```js
import { lighten } from '@theme-ui/color'
// lighten('primary', amount)
```

### `rotate`

Rotate the hue of a color by an amount 0–360

```js
import { rotate } from '@theme-ui/color'
// rotate('primary', degrees)
```

### `hue`

Set the hue of a color to a degree 0–360

```js
import { hue } from '@theme-ui/color'
// hue('primary', degrees)
```

### `saturation`

Set the saturation of a color to an amount 0–1

```js
import { saturation } from '@theme-ui/color'
// saturation('primary', amount)
```

### `lightness`

Set the lightness of a color to an amount 0–1

```js
import { lightness } from '@theme-ui/color'
// lightness('primary', amount)
```

### `desaturate`

Desaturate a color by an amount 0–1

```js
import { desaturate } from '@theme-ui/color'
// desaturate('primary', amount)
```

### `saturate`

Saturate a color by an amount 0–1

```js
import { saturate } from '@theme-ui/color'
// saturate('primary', amount)
```

### `shade`

Shade a color by an amount 0–1

```js
import { shade } from '@theme-ui/color'
// shade('primary', amount)
```

### `tint`

Tint a color by an amount 0–1

```js
import { tint } from '@theme-ui/color'
// tint('primary', amount)
```

### `alpha`

Set the transparency of a color to an amount 0-1

```js
import { alpha } from '@theme-ui/color'
// alpha('primary', amount)
```

### `transparentize`

Similar to `alpha`, but decreases opacity by the given amount.

```js
import { transparentize } from '@theme-ui/color'
// transparentize('primary', amount)
```

### `mix`

Mix two colors by a specific ratio

```js
import { mix } from '@theme-ui/color'
// mix('primary', 'secondary', ratio)
```

### `complement`

Get the complement of a color

```js
import { complement } from '@theme-ui/color'
// complement('primary')
```

### `invert`

Get the inverted color

```js
import { invert } from '@theme-ui/color'
// invert('primary')
```

### Related

- [Polished](https://polished.js.org)

