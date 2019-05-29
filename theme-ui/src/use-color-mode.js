import React, {
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import merge from 'lodash.merge'
import { css } from '@styled-system/css'
import { Global } from '@emotion/core'
import { Context, useThemeUI } from './context'

const STORAGE_KEY = 'theme-ui-color-mode'
const COLORS_KEY = 'theme-ui-colors'

const storage = {
  get: (init) => window.localStorage.getItem(STORAGE_KEY) || init,
  set: (value) => window.localStorage.setItem(STORAGE_KEY, value),
  setColors: (css) => window.localStorage.setItem(COLORS_KEY, css),
}

export const getMediaQuery = () => {
  const darkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia ? window.matchMedia(darkQuery) : {}
  const dark = mql.media === darkQuery
  return dark && mql.matches
}

export const useColorState = (initialMode) => {
  const [ mode, setMode ] = useState(initialMode)

  useLayoutEffect(() => {
    const stored = storage.get()
    const dark = getMediaQuery()
    if (dark) {
      setMode('dark')
      return
    }
    if (!stored || stored === mode) return
    setMode(stored)
  }, [])

  useEffect(() => {
    if (!mode) return
    storage.set(mode)
  }, [ mode ])

  return [ mode, setMode ]
}

export const ColorModeProvider = ({
  initialColorMode,
  children
}) => {
  const outer = useThemeUI()
  const [ colorMode, setColorMode ] = useColorState(initialColorMode)
  const context = merge({
    colorMode,
    setColorMode,
  }, outer)
  return (
    <Context.Provider
      value={context}
      children={children}
    />
  )
}

export const useColorMode = () => {
  const { colorMode, setColorMode, theme } = useThemeUI()

  if (typeof setColorMode !== 'function') {
    throw new Error(
      `[useColorMode] requires the ColorModeProvider component`
    )
    return []
  }

  // initialize
  useEffect(() => {
    const init = storage.get()
    if (!init || init === colorMode) return
    setColorMode(init)
  }, [])

  useEffect(() => {
    const { colors } = theme
    if (!colors) return
    const css = `.${CLASSNAME} {
      color: ${colors.text};
      background-color: ${colors.background};
    }`
    storage.setColors(css)
  }, [colorMode])

  return [ colorMode, setColorMode ]
}

export const CLASSNAME = 'theme-ui-color-mode'

export const ColorMode = ({
  className = CLASSNAME,
}) =>
  <Global
    styles={css({
      [`.${className}`]: {
        color: 'text',
        bg: 'background',
      }
    })}
  />

export default useColorMode
