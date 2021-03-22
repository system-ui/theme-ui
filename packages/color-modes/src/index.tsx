import React, { Dispatch, useEffect, useState, SetStateAction } from 'react'
import {
  jsx,
  useThemeUI,
  merge,
  __ThemeUIInternalBaseThemeProvider,
} from '@theme-ui/core'
import { get, Theme, __internalGetUseRootStyles } from '@theme-ui/css'
import { Global } from '@emotion/react'

import { toCustomProperties, createColorStyles } from './custom-properties'

const STORAGE_KEY = 'theme-ui-color-mode'

declare module '@theme-ui/core' {
  export interface ThemeUIContextValue {
    colorMode?: string
    setColorMode?: (colorMode: SetStateAction<string | undefined>) => void
  }
}

const storage = {
  get: () => {
    try {
      return window.localStorage.getItem(STORAGE_KEY)
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

const getPreferredColorScheme = (): 'dark' | 'light' | null => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light'
    }
  }
  return null
}

const getModeFromClass = (): string | undefined => {
  let mode: string | undefined
  if (typeof document !== 'undefined') {
    document.documentElement.classList.forEach((className) => {
      if (className.startsWith('theme-ui-')) {
        mode = className.replace('theme-ui-', '')
      }
    })
  }
  return mode
}

const useColorModeState = (theme: Theme = {}) => {
  let [mode, setMode] = useState(() => {
    const modeFromClass = getModeFromClass()
    if (modeFromClass) {
      return modeFromClass
    }

    const preferredMode =
      theme.useColorSchemeMediaQuery !== false && getPreferredColorScheme()

    return preferredMode || theme.initialColorModeName
  })

  // on first render, we read the color mode from localStorage and
  // clear the class on document element body
  useEffect(() => {
    const stored = theme.useLocalStorage !== false && storage.get()

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-ui-' + stored)
      document.body.classList.remove('theme-ui-' + stored)
    }

    if (stored && stored !== mode) {
      mode = stored
      setMode(stored)
    }
  }, [])

  // when mode changes, we save it to localStorage
  React.useEffect(() => {
    if (mode && theme.useLocalStorage !== false) {
      storage.set(mode)
    }
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

const applyColorMode = (theme: Theme, mode: string | undefined): Theme => {
  if (!mode) return { ...theme }
  const modes = get(theme, 'colors.modes', {})
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

export const ColorModeProvider: React.FC = ({ children }) => {
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorModeState(outer.theme)

  const theme = applyColorMode(outer.theme || {}, colorMode)
  if (theme.useCustomProperties !== false) {
    // TODO: This mutation is less than ideal
    // We could save custom properties to `theme.colorVars`,
    // But it's infeasible to do this because of how the packages are split.
    theme.rawColors = theme.colors
    theme.colors = toCustomProperties(theme.colors, 'colors')
  }

  const context = {
    ...outer,
    theme,
    colorMode,
    setColorMode,
  }

  const isTopLevelColorModeProvider = outer.setColorMode === undefined

  return jsx(
    __ThemeUIInternalBaseThemeProvider,
    { context },
    isTopLevelColorModeProvider
      ? jsx(Global, {
          styles: () => {
            return createColorStyles(theme)
          },
        })
      : jsx('div', {
          className: 'theme-ui__nested-color-mode-provider',
          // TODO: This could be refactored a bit.
          style: createColorStyles(theme)[
            __internalGetUseRootStyles(theme).scope
          ],
        }),
    children
  )
}

const noflash = `(function() { try {
  var mode = localStorage.getItem('theme-ui-color-mode');
  if (!mode) return
  document.documentElement.classList.add('theme-ui-' + mode);
  document.body.classList.add('theme-ui-' + mode);
} catch (e) {} })();`

export const InitializeColorMode = () =>
  jsx('script', {
    key: 'theme-ui-no-flash',
    dangerouslySetInnerHTML: {
      __html: noflash,
    },
  })
