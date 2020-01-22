import React from 'react'
import { jsx, useThemeUI, merge, Context } from '@theme-ui/core'
import { get } from '@theme-ui/css'
import { Global, ThemeContext as EmotionContext } from '@emotion/core'
import { toCustomProperties, createColorStyles } from './custom-properties'

const STORAGE_KEY = 'theme-ui-color-mode'

const storage = {
  get: init => {
    try {
      return window.localStorage.getItem(STORAGE_KEY) || init
    } catch (e) {
      console.warn(
        'localStorage is disabled and color mode might not work as expected.',
        'Please check your Site Settings.',
        e
      )
    }
  },
  set: value => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch (e) {
      console.warn(
        'localStorage is disabled and color mode might not work as expected.',
        'Please check your Site Settings.',
        e
      )
    }
  },
}

const getMediaQuery = () => {
  const darkQuery = '(prefers-color-scheme: dark)'
  const lightQuery = '(prefers-color-scheme: light)'
  const darkMQL = window.matchMedia ? window.matchMedia(darkQuery) : {}
  const lightMQL = window.matchMedia ? window.matchMedia(lightQuery) : {}
  const dark = darkMQL.media === darkQuery && darkMQL.matches
  if (dark) return 'dark'
  const light = lightMQL.media === lightQuery && lightMQL.matches
  if (light) return 'light'
  return 'default'
}

const useColorModeState = (theme = {}) => {
  const [mode, setMode] = React.useState(
    theme.initialColorModeName || 'default'
  )

  // initialize state
  React.useEffect(() => {
    const stored = storage.get()
    document.body.classList.remove('theme-ui-' + stored)
    if (!stored && theme.useColorSchemeMediaQuery) {
      const query = getMediaQuery()
      setMode(query)
      return
    }
    if (!stored || stored === mode) return
    setMode(stored)
  }, [])

  React.useEffect(() => {
    if (!mode) return
    storage.set(mode)
  }, [mode])

  if (process.env.NODE_ENV !== 'production') {
    if (
      theme.colors &&
      theme.colors.modes &&
      Object.keys(theme.colors.modes).indexOf(theme.initialColorModeName) > -1
    ) {
      console.warn(
        'The `initialColorModeName` value should be a unique name' +
          ' and cannot reference a key in `theme.colors.modes`.'
      )
    }
  }

  return [mode, setMode]
}

export const useColorMode = () => {
  const { colorMode, setColorMode } = useThemeUI()

  if (typeof setColorMode !== 'function') {
    throw new Error(`[useColorMode] requires the ColorModeProvider component`)
  }

  return [colorMode, setColorMode]
}

const applyColorMode = (theme, mode) => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

const BodyStyles = () =>
  jsx(Global, {
    styles: theme => createColorStyles(theme),
  })

export const ColorModeProvider = ({ children }) => {
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorModeState(outer.theme)
  const theme = applyColorMode(outer.theme || {}, colorMode)
  const emotionTheme = { ...theme }

  if (theme.useCustomProperties !== false) {
    emotionTheme.colors = toCustomProperties(emotionTheme.colors, 'colors')
  }

  const context = {
    ...outer,
    theme,
    colorMode,
    setColorMode,
  }

  return jsx(
    EmotionContext.Provider,
    { value: emotionTheme },
    jsx(
      Context.Provider,
      { value: context },
      jsx(BodyStyles, { key: 'color-mode' }),
      children
    )
  )
}

const noflash = `(function() { try {
  var mode = localStorage.getItem('theme-ui-color-mode');
  if (!mode) return
  document.body.classList.add('theme-ui-' + mode);
} catch (e) {} })();`

export const InitializeColorMode = () =>
  jsx('script', {
    key: 'theme-ui-no-flash',
    dangerouslySetInnerHTML: {
      __html: noflash,
    },
  })
