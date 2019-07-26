import { useEffect, useReducer } from 'react'
import { ThemeContext as EmotionContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { get } from '@styled-system/css'
import merge from './merge'
import jsx from './jsx'
import { Context, useThemeUI } from './context'
import { useColorState } from './color-modes'
import { createComponents } from './components'

const mergeState = (state, next) => merge.all({}, state, next)

const colorModesToCSSProperties = modes => {
  return Object.keys(modes).reduce((parsedModes, modeKey) => {
    const colors = modes[modeKey]
    return {
      ...parsedModes,
      [modeKey]: Object.keys(colors).reduce(
        (parsedColors, colorKey) => ({
          ...parsedColors,
          [`--theme-ui-${colorKey}`]: colors[colorKey],
        }),
        {}
      ),
    }
  }, {})
}

const applyCSSProperties = theme => {
  const { colors } = theme
  return {
    ...theme,
    colors: Object.keys(colors).reduce(
      (parsedColors, key) => ({
        ...parsedColors,
        [key]:
          key === 'modes'
            ? colorModesToCSSProperties(colors[key])
            : `var(--theme-ui-${key}, ${colors[key]})`,
      }),
      {}
    ),
  }
}

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

const BaseProvider = ({ context, components, children }) => {
  const theme = context.theme
  return jsx(
    EmotionContext.Provider,
    { value: theme.useCustomProperties ? applyCSSProperties(theme) : theme },
    jsx(
      MDXProvider,
      { components },
      jsx(Context.Provider, { value: context, children })
    )
  )
}

const RootProvider = ({ theme: propsTheme = {}, components, children }) => {
  // components are provided in the default Context
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorState(propsTheme.initialColorMode)
  const [themeState, setThemeState] = useReducer(mergeState, propsTheme)
  const theme = applyColorMode(themeState, colorMode)

  const context = {
    __THEME_UI__: true,
    colorMode,
    setColorMode,
    components: { ...outer.components, ...createComponents(components) },
    theme,
    setTheme: setThemeState,
  }

  useEffect(() => {
    window.__THEME_UI__ = context
  }, [context.theme, context.colorMode])

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
