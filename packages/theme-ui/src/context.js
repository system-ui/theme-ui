import {
  createContext,
  useContext,
  useReducer
} from 'react'
import merge from 'lodash.merge'
import { get } from '@styled-system/css'
import styled from '@emotion/styled'
import { components } from './components'
import themed from './themed'
import { useColorState } from './color-modes'

export const Context = createContext({
  theme: {},
  components,
})

export const useThemeUI = () => useContext(Context)

const merger = (state, next) => merge({}, state, next)

const createComponents = (components = {}) => {
  const next = {}
  Object.keys(components).forEach(key => {
    next[key] = styled(components[key])(themed(key))
  })
  return next
}

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge({}, theme, {
    colors: get(modes, mode, theme.colors)
  })
}

export const useTheme = (opts) => {
  const outer = useContext(Context)
  const [ theme, setTheme ] = useReducer(merger, opts.theme || {})
  const [ colorMode, setColorMode ] = useColorState(outer.colorMode || (opts.theme ? opts.theme.initialColorMode : undefined))

  const context = merge({}, {
    colorMode,
    setColorMode,
  }, outer, {
    theme: applyColorMode(theme, outer.colorMode || colorMode),
    setTheme,
    components: createComponents(opts.components)
  })

  return context
}
