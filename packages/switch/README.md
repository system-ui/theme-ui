
# @theme-ui/switch

Accessible, controlled toggle switch UI component built with [react-switch][]

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
      aria-label='Toggle dark mode'
      checked={checked}
      onChange={e => {
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
  checkedIcon={<OnIcon />}
  uncheckedIcon={<OffIcon />}
/>
```

```jsx
// custom styles with css prop
<Switch
  css={{
    bg: 'black',
  }}
/>
```

## Props

The Switch component accepts the same props as [react-switch](https://github.com/markusenglund/react-switch#api), including:

- `checked` (boolean) checked state
- `onChange` (function) change handler
- `checkedIcon` (element or boolean) left icon
- `uncheckedIcon` (element or boolean) right icon

All props are passed directly to the react-switch component.

MIT License

[react-switch]: https://github.com/markusenglund/react-switch
