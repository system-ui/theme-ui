import React, {
  Dispatch,
  useEffect,
  useState,
  useMemo,
  SetStateAction,
} from 'react'
import {
  jsx,
  useThemeUI,
  __ThemeUIInternalBaseThemeProvider,
} from '@theme-ui/core'
import { get, Theme, ColorModesScale } from '@theme-ui/css'
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
  const { initialColorModeName, useColorSchemeMediaQuery, useLocalStorage } =
    theme.config || theme

  let [mode, setMode] = useState(() => {
    const modeFromClass = getModeFromClass()
    if (modeFromClass) {
      return modeFromClass
    }

    const preferredMode =
      useColorSchemeMediaQuery !== false && getPreferredColorScheme()

    return preferredMode || initialColorModeName
  })

  // on first render, we read the color mode from localStorage and
  // clear the class on document element body
  useEffect(() => {
    const stored = useLocalStorage !== false && storage.get()

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-ui-' + stored)
      document.body.classList.remove('theme-ui-' + stored)
    }

    if (stored && stored !== mode) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mode = stored
      setMode(stored)
    }
  }, [])

  // when mode changes, we save it to localStorage
  React.useEffect(() => {
    if (mode && useLocalStorage !== false) {
      storage.set(mode)
    }
  }, [mode, useLocalStorage])

  if (process.env.NODE_ENV !== 'production') {
    if (
      theme.colors?.modes &&
      initialColorModeName &&
      Object.keys(theme.colors.modes).indexOf(initialColorModeName) > -1
    ) {
      console.warn(
        '[theme-ui] The `initialColorModeName` value should be a unique name' +
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

const omitModes = (colors: ColorModesScale) => {
  const res = { ...colors }
  delete res.modes
  return res
}

const assembleColorModes = (theme: Theme, outer: Theme) => {
  const initialColorModeName =
    (outer.config || outer).initialColorModeName || '__default'

  const { colors = {} } = outer

  const mutatedColors = get(theme, 'colors', {})
  const modes = get(outer, 'colors.modes', {})

  if (!('modes' in colors)) return mutatedColors

  return {
    ...mutatedColors,
    modes: {
      [initialColorModeName]: omitModes(colors),
      ...modes,
    },
  }
}

export const ColorModeProvider: React.FC = ({ children }) => {
  const outer = useThemeUI()
  const outerTheme = outer.theme

  const [colorMode, setColorMode] = useColorModeState(outerTheme)

  const theme = useMemo(() => {
    const res = { ...outerTheme }

    if (colorMode) {
      const modes = get(res, 'colors.modes', {})
      const currentColorMode = get(modes, colorMode, {})
      res.colors = {
        ...res.colors,
        ...currentColorMode,
      }
    }

    const { useCustomProperties } = outerTheme.config || outerTheme

    if (useCustomProperties !== false) {
      res.rawColors = assembleColorModes(res, outerTheme)
      res.colors = toCustomProperties(
        omitModes(outerTheme.colors || {}),
        'colors'
      )
    }

    return res
  }, [colorMode, outerTheme])

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
          style: createColorStyles(theme)['html'],
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
