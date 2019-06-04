
# @theme-ui/switch

Accessibly, controlled toggle switch UI component for Theme UI

```sh
npm i @theme-ui/switch
```

```jsx
import React, { useState } from 'react'
import Switch from '@theme-ui/switch'

export default props => {
  const [ checked, setChecked ] = useState(false)

  return (
    <Switch
      label='Toggle dark mode'
      checked={checked}
      onClick={e => {
        setChecked(!checked)
      }}
    />
  )
}
```

## Customization

```jsx
// custom icons
<Switch
  icons={{
    checked: <OnIcon />,
    unchecked: <OffIcon />,
  }}
/>
```

```jsx
// custom thumb
<Switch
  thumb={<Thumb />}
/>
```

```jsx
// custom styles with css prop
<Switch
  thumb={(
    <Thumb
      css={{
        bg: 'tomato',
      }}
    />
  )}
  css={{
    bg: 'black',
    '&.active': {
      bg: 'primary',
    }
  }}
/>
```

## Props

- `checked` (boolean) checked state
- `onClick` (function) click handler
- `label` (string) ARIA label
- `icons` (object) custom icons
  - `icons.checked` (element) left icon
  - `icons.unchecked` (element) right icon
- `thumb` (element) optional custom thumb element

All other props are passed directly to the root `<button>` element.

MIT License
