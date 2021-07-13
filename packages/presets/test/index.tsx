import { Theme } from '@theme-ui/css'

import {
  base,
  bootstrap,
  bulma,
  dark,
  deep,
  funk,
  future,
  polaris,
  roboto,
  sketchy,
  swiss,
  system,
  tailwind,
  tosh,
} from '../dist/theme-ui-presets.cjs'

describe('presets', () => {
  it('can be passed to ThemeProvider', () => {
    const _presets: Theme[] = [
      base,
      bootstrap,
      bulma,
      dark,
      deep,
      funk,
      future,
      polaris,
      roboto,
      sketchy,
      swiss,
      system,
      tailwind,
      tosh,
    ]
  })
})
