import { Theme } from '@theme-ui/css'

import theme from '../src'

// Nothing actually executed here; just verify it typechecks.
test('assignable to Theme', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const typedTheme: Theme = theme
})
