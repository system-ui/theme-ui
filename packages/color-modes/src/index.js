import React from 'react'
import {
  jsx,
  useThemeUI,
  merge,
  Context,
} from '@theme-ui/core'
import { get } from '@theme-ui/css'
import {
  Global,
  ThemeContext as EmotionContext
} from '@emotion/core'
import {
  toCustomProperties,
  createColorStyles,
} from './custom-properties'

const STORAGE_KEY = 'theme-ui-color-mode'
const storage = {
  get: init => window.localStorage.getItem(STORAGE_KEY) || init,
  set: value => window.localStorage.setItem(STORAGE_KEY, value),
}

// todo: update API
/*
const getMediaQuery = () => {
  const darkQuery = '(prefers-color-scheme: dark)'
  const mql = window.matchMedia ? window.matchMedia(darkQuery) : {}
  const dark = mql.media === darkQuery
  return dark && mql.matches
}
*/

export const useColorModeState = (theme = {}) => {
  const [mode, setMode] = React.useState(theme.initialColorModeName || 'default')

  // initialize state
  React.useEffect(() => {
    const stored = storage.get()
    document.body.classList.remove('theme-ui-' + stored)
    // consider prefers-color-scheme media query
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
  // TODO: test for how this affects usage
  if (theme.useCustomProperties !== false) {
    // theme.colors = toCustomProperties(theme.colors, 'colors')
  }
  return merge.all({}, theme, {
    colors: get(modes, mode, {}),
  })
}

export const ColorMode = () =>
  jsx(Global, {
    styles: createColorStyles
  })

const BaseProvider = ({ context, children }) => {
  const theme = {...context.theme}
  if (theme.useCustomProperties !== false) {
    theme.colors = toCustomProperties(theme.colors, 'colors')
  }
  return jsx(
    EmotionContext.Provider, { value: theme },
    jsx(Context.Provider, {
      value: context,
      children
    })
  )
}

export const ColorModeProvider = ({
  children,
}) => {
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorModeState(outer.theme)
  const theme = applyColorMode(outer.theme || {}, colorMode)
  const context = {
    ...outer,
    theme,
    colorMode,
    setColorMode,
  }

  return jsx(React.Fragment, null,
    jsx(ColorMode),
    jsx(BaseProvider, {
      context,
      children,
    })
  )
}

const noflash = `(function() { try {
  var mode = localStorage.getItem('theme-ui-color-mode');
  if (!mode) return
  document.body.classList.add('theme-ui-' + mode);
} catch (e) {} })();`

export const InitializeColorMode = () => (
  jsx('script', {
    key: 'theme-ui-no-flash',
    dangerouslySetInnerHTML: {
      __html: noflash,
    }
  })
)
