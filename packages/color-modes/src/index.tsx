import React, {
  Dispatch,
  useEffect,
  useLayoutEffect,
  useState,
  useMemo,
  SetStateAction,
  useCallback,
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
  css,
} from '@theme-ui/css'
import { Global } from '@emotion/react'

import {
  toCustomProperties,
  __createColorStyles,
  __createColorProperties,
} from './custom-properties'

const STORAGE_KEY = 'theme-ui-color-mode'
const DARK_QUERY = '(prefers-color-scheme: dark)'
const LIGHT_QUERY = '(prefers-color-scheme: light)'

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
    if (window.matchMedia(DARK_QUERY).matches) {
      return 'dark'
    }
    if (window.matchMedia(LIGHT_QUERY).matches) {
      return 'light'
    }
  }
  return null
}

const useClientsideEffect =
  typeof window === 'undefined' ? () => {} : useLayoutEffect

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
    const preferredMode =
      useColorSchemeMediaQuery !== false && getPreferredColorScheme()

    return preferredMode || initialColorModeName
  })

  // on first render, we read the color mode from localStorage and
  // clear the class on document element body
  useClientsideEffect(() => {
    const stored = useLocalStorage !== false && storage.get()

    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('theme-ui-' + stored)
    }

    if (
      useColorSchemeMediaQuery !== 'system' &&
      stored &&
      stored !== colorMode
    ) {
      colorMode = stored
      setColorMode(stored)
    }
  }, [])

  // when mode changes, we save it to localStorage
  useEffect(() => {
    if (colorMode && useLocalStorage !== false) {
      storage.set(colorMode)
    }
  }, [colorMode, useLocalStorage])

  const setPreferredColorScheme = useCallback(() => {
    const preferredColorScheme = getPreferredColorScheme()
    setColorMode(preferredColorScheme || initialColorModeName)
  }, [initialColorModeName])

  useEffect(() => {
    if (useColorSchemeMediaQuery === 'system' && window.matchMedia) {
      // It doesn't matter if we add the listener only to the dark media query
      // Because in our callback function we'll check for both media queries (light and dark).
      const darkMQL = window.matchMedia(DARK_QUERY)
      if (typeof darkMQL.addEventListener === 'function') {
        darkMQL.addEventListener('change', setPreferredColorScheme)
      } else if (typeof darkMQL.addListener === 'function') {
        darkMQL.addListener(setPreferredColorScheme)
      }
    }

    return () => {
      if (useColorSchemeMediaQuery === 'system' && window.matchMedia) {
        const darkMQL = window.matchMedia(DARK_QUERY)
        if (typeof darkMQL.removeEventListener === 'function') {
          darkMQL.removeEventListener('change', setPreferredColorScheme)
        } else if (typeof darkMQL.removeListener === 'function') {
          darkMQL.removeListener(setPreferredColorScheme)
        }
      }
    }
  }, [useColorSchemeMediaQuery, setPreferredColorScheme])

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
    const allColorKeys: Array<string> = []
    const flattenKeys = (obj: Record<string, any>) => {
      Object.keys(obj).forEach((key) => {
        allColorKeys.push(key)
        if (typeof obj[key] === 'object') {
          flattenKeys(obj[key])
        }
      })
      return allColorKeys
    }
    flattenKeys(outerTheme.colors ?? {}).forEach((color) => {
      if (color !== color.trim()) {
        console.warn(
          `[theme-ui] Key \`${color}\` in theme.colors contains leading/trailing ` +
            'whitespace, which can cause bugs in your project.'
        )
      }
    })
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
      return { html: __createColorStyles(theme) }
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

  // Nested theme providers need to be rerendered after hydration for the correct
  // color mode to apply.
  const [needsRerender, setNeedsRerender] = useState(
    // Note: we could also check some "ssr-enabled" flag as an optimization for
    // SPAs, as deeply nested theme providers will also pay a performance penalty
    // for this SSR bug fix
    () => newTheme.config?.useLocalStorage !== false
  )

  useClientsideEffect(() => void setNeedsRerender(false), [])

  const themeColors = newTheme.rawColors || newTheme.colors
  const useCustomProperties = newTheme.config?.useCustomProperties

  const colorVars = useMemo(() => {
    if (useCustomProperties === false) {
      return {}
    }
    const colors = themeColors || {}

    return css(__createColorProperties(colors, colors.modes || {}))(newTheme)
  }, [newTheme, themeColors, useCustomProperties])

  return (
    <ThemeUIInternalBaseThemeProvider
      context={{ ...outerCtx, theme: newTheme }}
    >
      {/* Changed CSS Variables will cascade from the wrapping div */}
      {jsx('div', {
        'data-themeui-nested-provider': true,
        // the key here ensures that children will be rerendered after color
        // mode is read from localStorage
        key: Number(needsRerender),
        suppressHydrationWarning: true,
        css: colorVars,
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
} catch (e) {} })();`

export const InitializeColorMode = () =>
  jsx('script', {
    key: 'theme-ui-no-flash',
    dangerouslySetInnerHTML: {
      __html: noflash,
    },
  })
