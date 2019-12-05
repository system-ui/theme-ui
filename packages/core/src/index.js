// todo/figure out
// - [ ] color modes
// - [ ] custom properties
// - [ ] mdx components @theme-ui/mdx
// - [ ] better default color mode name API

// API
//  <ThemeProvider theme={theme}>
//    <ColorModeProvider>
//      <MDXProvider>
//        <ColorMode />
//        <App />
//      </MDXProvider>
//    </ColorModeProvider>
//  </ThemeProvider>

import {
  jsx as emotion,
  ThemeContext as EmotionContext,
} from '@emotion/core'
import { css, get } from '@theme-ui/css'
import {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import deepmerge from 'deepmerge'
import { version as __EMOTION_VERSION__ } from '@emotion/core/package.json'

const getCSS = props => {
  if (!props.sx && !props.css) return undefined
  return theme => {
    const styles = css(props.sx)(theme)
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css
    return [styles, raw]
  }
}

const parseProps = props => {
  if (!props) return null
  const next = {}
  for (let key in props) {
    if (key === 'sx') continue
    next[key] = props[key]
  }
  const css = getCSS(props)
  if (css) next.css = css
  return next
}

export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [type, parseProps(props), ...children])

export const Context = createContext({
  __EMOTION_VERSION__,
  theme: null,
})

export const useThemeUI = () => useContext(Context)

const canUseSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_ELEMENT = canUseSymbol ? Symbol.for('react.element') : 0xeac7
const FORWARD_REF = canUseSymbol ? Symbol.for('react.forward_ref') : 0xeac7

const isMergeableObject = n => {
  return (
    !!n &&
    typeof n === 'object' &&
    n.$$typeof !== REACT_ELEMENT &&
    n.$$typeof !== FORWARD_REF
  )
}

const arrayMerge = (destinationArray, sourceArray, options) => sourceArray

export const merge = (a, b) =>
  deepmerge(a, b, { isMergeableObject, arrayMerge })

merge.all = (...args) => deepmerge.all(args, { isMergeableObject, arrayMerge })

const BaseProvider = ({ context, children }) =>
  jsx(
    EmotionContext.Provider, { value: context.theme },
    jsx(Context.Provider, {
      value: context,
      children
    })
  )

// possible new api
//  <ThemeProvider theme={theme}>
//  <ColorModeProvider>
//  <ComponentsProvider components={components}>

export const ThemeProvider = ({
  theme,
  children
}) => {
  const outer = useThemeUI()
  const context = {
    ...outer,
    theme: typeof theme === 'function'
      ? theme(outer.theme)
      : merge.all({}, outer.theme, theme)
  }
  return jsx(BaseProvider, {
    context,
    children
  })
}

// color modes
const STORAGE_KEY = 'theme-ui-color-mode'
const storage = {
  get: init => window.localStorage.getItem(STORAGE_KEY) || init,
  set: value => window.localStorage.setItem(STORAGE_KEY, value),
}

export const useColorState = theme => {
  const [mode, setMode] = useState(theme.initialColorModeName || 'default')

  // initialize state
  useEffect(() => {
    const stored = storage.get()
    document.body.classList.remove('theme-ui-' + stored)
    // consider prefers-color-scheme media query
    if (!stored || stored === mode) return
    setMode(stored)
  }, [])

  useEffect(() => {
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

export const ColorModeProvider = ({
  children,
}) => {
  const outer = useThemeUI()
  const [colorMode, setColorMode] = useColorModeState(outer.theme)
  const theme = applyColorMode(outer.theme, colorMode)
  const context = {
    ...outer,
    theme,
    colorMode,
    setColorMode,
  }

  return jsx(BaseProvider, {
    context,
    children,
  })
}

// export const ColorMode
// export const InitializeColorMode
