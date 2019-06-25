import { ThemeContext as EmotionContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { get } from '@styled-system/css'
import merge from './merge'
import jsx from './jsx'
import { Context, useThemeUI } from './context'
import { useColorState } from './color-modes'
import { createComponents } from './components'

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

const BaseProvider = ({ context, components, children }) => {
  const theme = applyColorMode(context.theme, context.colorMode)
  return jsx(
    EmotionContext.Provider,
    { value: theme },
    jsx(
      MDXProvider,
      { components },
      jsx(Context.Provider, { value: context, children })
    )
  )
}

const RootProvider = ({ theme = {}, components, children }) => {
  // components are provided in the default Context
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorState(theme.initialColorMode)

  const context = {
    __THEME_UI__: true,
    colorMode,
    setColorMode,
    components: { ...outer.components, ...createComponents(components) },
    theme,
  }

  return jsx(BaseProvider, {
    context,
    components: context.components,
    children,
  })
}

const NestedProvider = ({ theme, components, children }) => {
  const outer = useThemeUI()
  const context = merge.all({}, outer, { theme })

  return jsx(BaseProvider, {
    context,
    components: createComponents(components),
    children,
  })
}

export const ThemeProvider = props => {
  const outer = useThemeUI()
  if (outer.__THEME_UI__) {
    return jsx(NestedProvider, props)
  }
  return jsx(RootProvider, props)
}
