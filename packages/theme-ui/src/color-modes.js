import React, { useState, useEffect } from 'react'
import { css } from '@styled-system/css'
import { Global } from '@emotion/core'
import { useThemeUI } from './context'
import { createColorStyles } from './custom-properties'

const STORAGE_KEY = 'theme-ui-color-mode'

const storage = {
  get: init => window.localStorage.getItem(STORAGE_KEY) || init,
  set: value => window.localStorage.setItem(STORAGE_KEY, value),
}

export const getMediaQuery = () => {
  const darkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia ? window.matchMedia(darkQuery) : {}
  const dark = mql.media === darkQuery
  return dark && mql.matches
}

export const useColorState = initialMode => {
  const [mode, setMode] = useState(initialMode)

  useEffect(() => {
    // initialize
    const stored = storage.get()
    document.body.classList.remove('theme-ui-' + stored)
    const dark = getMediaQuery()
    if (!stored && dark) return setMode('dark')
    if (!stored || stored === mode) return
    setMode(stored)
  }, [])

  useEffect(() => {
    if (!mode) return
    storage.set(mode)
  }, [mode])

  return [mode, setMode]
}

export const useColorMode = initialMode => {
  const { colorMode, setColorMode } = useThemeUI()

  if (typeof setColorMode !== 'function') {
    throw new Error(`[useColorMode] requires the ThemeProvider component`)
  }

  return [colorMode, setColorMode]
}

const bodyColor = theme => ({
  body: createColorStyles(theme),
})

export const ColorMode = () => <Global styles={bodyColor} />

export default useColorMode
