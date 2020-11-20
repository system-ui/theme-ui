import React, { Dispatch, SetStateAction } from 'react'
import { jsx, useThemeUI, merge, Context } from '@theme-ui/core'
import { get, Theme } from '@theme-ui/css'
import { Global, ThemeContext as EmotionContext } from '@emotion/core'
import { toCustomProperties, createColorStyles } from './custom-properties'

const STORAGE_KEY = 'theme-ui-color-mode'

declare module '@theme-ui/core' {
  export interface ContextValue {
    colorMode?: string
    setColorMode?: (colorMode: SetStateAction<string>) => void
  }
}

const storage = {
  get: (init?: string) => {
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
  set: (value: string) => {
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
  const darkMQL = window.matchMedia
    ? window.matchMedia(darkQuery)
    : { media: false }
  const lightMQL = window.matchMedia
    ? window.matchMedia(lightQuery)
    : { media: false }
  const dark = darkMQL.media === darkQuery && darkMQL.matches
  if (dark) return 'dark'
  const light = lightMQL.media === lightQuery && lightMQL.matches
  if (light) return 'light'
  return 'default'
}

const useColorModeState = (theme: Theme = {}) => {
  const [mode, setMode] = React.useState(
    theme.initialColorModeName || 'default'
  )

  // initialize state
  React.useEffect(() => {
    const stored = theme.useLocalStorage !== false && storage.get()
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
    if (!mode || theme.useLocalStorage === false) return
    storage.set(mode)
  }, [mode])

  if (process.env.NODE_ENV !== 'production') {
    if (
      theme.colors &&
      theme.colors.modes &&
      theme.initialColorModeName &&
      Object.keys(theme.colors.modes).indexOf(theme.initialColorModeName) > -1
    ) {
      console.warn(
        'The `initialColorModeName` value should be a unique name' +
          ' and cannot reference a key in `theme.colors.modes`.'
      )
    }
  }

  return [mode, setMode] as const
}

export function useColorMode<T extends string = string>(): [
  T,
  Dispatch<SetStateAction<T>>
] {
  const { colorMode, setColorMode } = useThemeUI()

  if (typeof setColorMode !== 'function') {
    throw new Error(`[useColorMode] requires the ColorModeProvider component`)
  }

  // We're allowing the user to specify a narrower type for its color mode name.
  return ([colorMode, setColorMode] as unknown) as [
    T,
    Dispatch<SetStateAction<T>>
  ]
}

const applyColorMode = (theme: Theme, mode: string): Theme => {
  if (!mode) return theme
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

const BodyStyles = ({ theme }: { theme: Theme}) =>
  jsx(Global, {
    styles: () => {
      return createColorStyles(theme);
    },
  })

export const ColorModeProvider: React.FC = ({ children }) => {
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
      jsx(BodyStyles, { key: 'color-mode', theme }),
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
