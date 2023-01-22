# @theme-ui/global

Wrapper around the Emotion `Global` component, made Theme UI theme-aware.

**Note:** _This package is included in the main `theme-ui` package and a
separate installation is not required unless you’re using `@theme-ui/core`._

```sh
npm i @theme-ui/global @theme-ui/core @emotion/react
```

```jsx
import Global from '@theme-ui/global'

export default (props) => (
  <Global
    styles={{
      button: {
        m: 0,
        bg: 'primary',
        color: 'background',
        border: 0,
      },
    }}
  />
)
```
