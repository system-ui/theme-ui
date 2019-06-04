
# @theme-ui/switch

Toggle switch UI component

```sh
npm i @theme-ui/switch
```

```js
import React, { useState } from 'react'
import Switch from '@theme-ui/switch'

export default props => {
  const [ checked, setChecked ] = useState(false)

  return (
    <Switch
      checked={checked}
      onClick={e => {
        setChecked(!checked)
      }}
    />
  )
}
```

```js
// custom icons
<Switch
  icons={{
    checked: <OnIcon />,
    unchecked: <OffIcon />,
  }}
/>
```

```js
// custom thumb
<Switch
  thumb={<Thumb />}
/>
```

