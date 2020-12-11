# @theme-ui/presets

Theme UI includes an optional presets package that can be used as examples or as a starting point for extending your own themes.

```sh
npm i @theme-ui/presets
```

```jsx
// example theme
import { funk } from '@theme-ui/presets'

export default {
  ...funk,
  styles: {
    ...funk.styles,
  },
}
```

To view an example of the built-in presets, see the [Demo][].

[demo]: https://theme-ui.com/demo

Currently, the following presets are available for use:

- [`base`](https://theme-ui.com/presets/base)
- [`system`](https://theme-ui.com/presets/system)
- [`funk`](https://theme-ui.com/presets/funk)
- [`future`](https://theme-ui.com/presets/future)
- [`roboto`](https://theme-ui.com/presets/roboto)
- [`dark`](https://theme-ui.com/presets/dark)
- [`deep`](https://theme-ui.com/presets/deep)
- [`swiss`](https://theme-ui.com/presets/swiss)
- [`tosh`](https://theme-ui.com/presets/tosh)
- [`bootstrap`](https://theme-ui.com/presets/bootstrap)
- [`bulma`](https://theme-ui.com/presets/bulma) (WIP)
- [`tailwind`](https://theme-ui.com/presets/tailwind)
- [`sketchy`](https://theme-ui.com/presets/sketchy), [Demo website](https://themeui-sketchy.netlify.app/)

## Contributing

We'd love to have more presets added to the Theme UI project.
If you'd like to add a new preset or improve upon the existing ones, please open an [issue][] or [pull request][].

[issue]: https://github.com/system-ui/theme-ui/issues
[pull request]: https://github.com/system-ui/theme-ui/pulls
