import { ThemeContext as EmotionContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { get } from '@styled-system/css'
import merge from 'lodash.merge'
import jsx from './jsx'
import { Context, useThemeUI } from './context'
import { useColorState } from './color-modes'
import { createComponents } from './components'

/*
 * changes
 * - ThemeProvider no longer merges outer context
 * - New NestedThemeProvider component (name tbd)
 */

const applyColorMode = (theme, mode) => {
  const modes = get(theme, 'colors.modes', {})
  return merge({}, theme, {
    colors: get(modes, mode, {})
  })
}

export const ThemeProvider = ({
  theme = {},
  components,
  children,
}) => {
  // components are provided in the default Context
  const outer = useThemeUI()
  if (outer.colorMode) {
    throw new Error(`
      [ThemeProvider]: only one ThemeProvider component can be used at a time.
    `)
  }

  const [ colorMode, setColorMode ] = useColorState(theme.initialColorMode)

  const context = {
    ...outer,
    colorMode,
    setColorMode,
    components: merge(outer.components, createComponents(components)),
    theme: applyColorMode(theme, colorMode),
  }

  return (
    jsx(EmotionContext.Provider, { value: context.theme },
      jsx(MDXProvider, { components: context.components },
        jsx(Context.Provider, {
          value: context,
          children,
        })
      )
    )
  )
}

// todo: rename this
export const NestedThemeProvider = ({ theme, children }) => {
  const outer = useThemeUI()
  const context = merge({}, outer, { theme })

  return jsx(EmotionContext.Provider, { value: context.theme },
    jsx(Context.Provider, {
      value: context,
      children
    })
  )
}
