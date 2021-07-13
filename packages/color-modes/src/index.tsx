import React, {
  Dispatch,
  useEffect,
  useState,
  useMemo,
  SetStateAction,
} from 'react'
import {
  jsx,
  ThemeUIContextValue,
  useThemeUI,
  __ThemeUIInternalBaseThemeProvider as ThemeUIInternalBaseThemeProvider,
} from '@theme-ui/core'
import {
  get,
  Theme,
  ColorModesScale,
  ColorMode,
  NestedScale,
} from '@theme-ui/css'
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
    } catch (err) {
      console.warn(
        'localStorage is disabled and color mode might not work as expected.',
        'Please check your Site Settings.',
        err
      )
    }
  },
  set: (value: string) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch (err) {
      console.warn(
        'localStorage is disabled and color mode might not work as expected.',
        'Please check your Site Settings.',
        err
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

const TopLevelColorModeProvider = ({
  outerCtx,
  children,
}: {
  outerCtx: ThemeUIContextValue
  children: React.ReactNode
}) => {
  const outerTheme = outerCtx.theme || {}
  const { initialColorModeName, useColorSchemeMediaQuery, useLocalStorage } =
    outerTheme.config || outerTheme

  let [colorMode, setColorMode] = useState(() => {
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

    if (stored && stored !== colorMode) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      colorMode = stored
      setColorMode(stored)
    }
  }, [])

  // when mode changes, we save it to localStorage
  React.useEffect(() => {
    if (colorMode && useLocalStorage !== false) {
      storage.set(colorMode)
    }
  }, [colorMode, useLocalStorage])

  if (process.env.NODE_ENV !== 'production') {
    if (
      outerTheme.colors?.modes &&
      initialColorModeName &&
      Object.keys(outerTheme.colors.modes).indexOf(initialColorModeName) > -1
    ) {
      console.warn(
        '[theme-ui] The `initialColorModeName` value should be a unique name' +
          ' and cannot reference a key in `theme.colors.modes`.'
      )
    }
  }

  const newTheme = useThemeWithAppliedColorMode({ colorMode, outerTheme })
  const newCtx = {
    ...outerCtx,
    theme: newTheme,
    colorMode,
    setColorMode,
  }

  return (
    <ThemeUIInternalBaseThemeProvider context={newCtx}>
      <GlobalColorStyles theme={newTheme} />
      {children}
    </ThemeUIInternalBaseThemeProvider>
  )
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
  return [colorMode, setColorMode] as unknown as [
    T,
    Dispatch<SetStateAction<T>>
  ]
}

const omitModes = (colors: ColorModesScale): ColorMode => {
  const res = { ...colors }
  delete res.modes
  return res
}

function copyRawColors(
  colors: ColorModesScale | NestedScale<string>,
  outerThemeRawColors: ColorModesScale
): void {
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string' && !value.startsWith('var(')) {
      outerThemeRawColors[key] = value
    } else if (typeof value === 'object') {
      const newValue = { ...(outerThemeRawColors[key] as object) }
      copyRawColors(value, newValue)
      outerThemeRawColors[key] = newValue
    }
  }
}

function useThemeWithAppliedColorMode({
  outerTheme,
  colorMode,
}: {
  outerTheme: Theme
  colorMode: string | undefined
}) {
  const theme = useMemo(() => {
    const res = { ...outerTheme }
    const modes = get(res, 'colors.modes', {})
    const currentColorMode = get(modes, colorMode, {})

    if (colorMode) {
      res.colors = {
        ...res.colors,
        ...currentColorMode,
      }
    }

    const { useCustomProperties, initialColorModeName = '__default' } =
      outerTheme.config || outerTheme

    let outerThemeRawColors = outerTheme.rawColors || outerTheme.colors || {}

    if (useCustomProperties !== false) {
      const alreadyHasRawColors = res.rawColors != null
      const colors = res.colors || {}

      if (alreadyHasRawColors) {
        outerThemeRawColors = { ...outerThemeRawColors }

        copyRawColors(colors, outerThemeRawColors)

        if (outerThemeRawColors.modes) {
          outerThemeRawColors.modes[initialColorModeName] =
            omitModes(outerThemeRawColors)
        }
        res.rawColors = outerThemeRawColors
      } else {
        if (!('modes' in outerThemeRawColors)) {
          res.rawColors = colors
        } else {
          const modes: ColorModesScale['modes'] = {
            [initialColorModeName]: omitModes(outerThemeRawColors),
            ...outerThemeRawColors.modes,
          }

          res.rawColors = {
            ...colors,
            modes,
          } as ColorModesScale /* modes doesn't match index signature by design */
        }
      }

      res.colors = toCustomProperties(omitModes(outerThemeRawColors), 'colors')
    }

    return res
  }, [colorMode, outerTheme])

  return theme
}

function GlobalColorStyles({ theme }: { theme: Theme }) {
  return jsx(Global, {
    styles: () => {
      return { html: createColorStyles(theme) }
    },
  })
}

function NestedColorModeProvider({
  outerCtx,
  children,
}: {
  outerCtx: ThemeUIContextValue
  children: React.ReactNode
}) {
  const newTheme = useThemeWithAppliedColorMode({
    outerTheme: outerCtx.theme,
    colorMode: outerCtx.colorMode,
  })

  return (
    <ThemeUIInternalBaseThemeProvider
      context={{ ...outerCtx, theme: newTheme }}>
      {/* Changed CSS Variables will cascade from the wrapping div */}
      {jsx('div', {
        className: 'theme-ui__nested-color-mode-provider',
        css: createColorStyles(newTheme),
        children,
      })}
    </ThemeUIInternalBaseThemeProvider>
  )
}

export const ColorModeProvider = ({
  children,
}: {
  children?: React.ReactNode
}) => {
  const outerCtx = useThemeUI()

  const isTopLevelColorModeProvider =
    typeof outerCtx.setColorMode !== 'function'

  return isTopLevelColorModeProvider ? (
    <TopLevelColorModeProvider outerCtx={outerCtx}>
      {children}
    </TopLevelColorModeProvider>
  ) : (
    <NestedColorModeProvider outerCtx={outerCtx}>
      {children}
    </NestedColorModeProvider>
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
