
# @theme-ui/toggle

Toggle switch component

```sh
npm i @theme-ui/toggle
```

```js
import React, { useState } from 'react'
import Toggle from '@theme-ui/toggle'

export default props => {
  const [ checked, setChecked ] = useState(false)

  return (
    <Toggle
      checked={checked}
      onClick={e => {
        setChecked(!checked)
      }}
    />
  )
}
```

```js
<Toggle
  checkedIcon={<OnIcon />}
  uncheckedIcon={<OffIcon />}
/>
```

```js
<Toggle
  backgroundColor='gray'
  checkedColor='primary'
  color='white'
  borderColor='midgray'
/>
```

```js
<Toggle
  colors={{
    background: 'muted',
    active: 'primary',
    border: 'gray',
    thumb: 'white',
  }}
/>
```
