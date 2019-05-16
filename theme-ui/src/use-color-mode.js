import React, {
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import merge from 'lodash.merge'
import { Context, useThemeUI } from './context'

const STORAGE_KEY = 'theme-ui-color-mode'

const get = (init) => window.localStorage.getItem(STORAGE_KEY) || init
const set = (value) => window.localStorage.setItem(STORAGE_KEY, value)

const getMediaQuery = () => {
  const darkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia ? window.matchMedia(darkQuery) : {}
  const dark = mql.media === darkQuery
  return dark && mql.matches
}

export const useColorState = (initialMode) => {
  const [ mode, setMode ] = useState(initialMode)

  useLayoutEffect(() => {
    const stored = get()
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
    set(mode)
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
  const { colorMode, setColorMode } = useThemeUI()

  if (typeof setColorMode !== 'function') {
    // todo
    console.warn(
      `useColorMode requires the ColorModeProvider`
    )
    return []
  }

  // initialize
  useEffect(() => {
    const init = get()
    if (!init || init === colorMode) return
    setColorMode(init)
  }, [])

  return [ colorMode, setColorMode ]
}

export default useColorMode
