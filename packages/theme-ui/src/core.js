import styled from '@emotion/styled'
import { useReducer } from 'react'
import { ThemeContext as EmotionContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { get } from '@styled-system/css'
import merge from 'lodash.merge'
import jsx from './jsx'
import themed from './themed'
import { Context, useThemeUI } from './context'
import { useColorState } from './color-modes'

const createComponents = (components = {}) => {
  const next = {}
  Object.keys(components).forEach(key => {
    next[key] = styled(components[key])(themed(key))
  })
  return next
}

export const BaseProvider = ({
  context,
  children,
}) =>
  jsx(EmotionContext.Provider, { value: context.theme },
    jsx(MDXProvider, { components: context.components },
      jsx(Context.Provider, {
        value: context,
        children,
      })
    )
  )

// todo: consider ditching props.components API
export const useThemeContext = (propsTheme) => {
  const outer = useThemeUI()
  const initialColorMode = outer.colorMode || (theme ? theme.initialColorMode : undefined)
  const mergeReducer = (state, next) => Object.assign({}, state, next)
  const [ theme, setTheme ] = useReducer(mergeReducer, merge({}, outer, propsTheme))
  const [ colorMode, setColorMode ] = useColorState(initialColorMode)
  const context = {
    colorMode,
    setColorMode,
    theme,
    setTheme,
  }
  return context
}

export const ThemeProvider = ({
  theme,
  components,
  ...props
}) => {
  const outer = useThemeUI()
  const initialColorMode = outer.colorMode || (theme ? theme.initialColorMode : undefined)
  const [ colorMode, setColorMode ] = useColorState(initialColorMode)
  const context = merge({}, {
    colorMode,
    setColorMode,
  }, outer, {
    theme,
    components: createComponents(components),
  })

  if (context.colorMode) {
    const modes = get(context.theme, 'colors.modes', {})
    context.theme = merge({}, context.theme, {
      colors: get(modes, context.colorMode, context.theme.colors)
    })
  }

  return (
    jsx(BaseProvider, { context }, props.children)
  )
}

