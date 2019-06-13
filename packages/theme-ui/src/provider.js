// rewrite
//
// - [x] get outer context
// - [x] theme
// - [x] theme state
// - [ ] color mode + state (use outer state)
// - [ ] pick colors object

import React, {
  createElement as jsx,
  createContext,
  useReducer,
  useEffect,
  useContext,
} from 'react'
import assign from 'object-assign'
import { ThemeContext as Emotion } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import merge from 'lodash.merge'
// import get from 'lodash.get'
import { Context } from './context'

const IS_DEV = process.env.NODE_ENV !== 'production'
const IS_BROWSER = typeof window !== 'undefined'
// let __id, uuid

if (IS_DEV && IS_BROWSER) {
  window.__THEME_UI__ = window.__THEME_UI__ || {}
  // __id = 0
  // uuid = () => __id++
}

const mergeState = (state, next) => merge({}, state, next)

export const useThemeContext = (props) => {
  const outer = useContext(Context)
  const colorMode = outer.colorMode || outer.theme.initialColorMode || props.theme.initialColorMode
  const base = assign({}, outer, {
    colorMode,
    theme: props.theme,
  })

  const [ state, setState ] = useReducer(mergeState, base)

  const setTheme = theme => setState({ theme })
  const setColorMode = colorMode => setState({ colorMode })

  const context = assign({}, state, {
    setState,
    setTheme,
    setColorMode,
  })

  if (context.colorMode) {
    // console.log(context.colorMode, context.theme)
    // context.theme.colors = merge(get(context.theme, `colors.${context.colorMode}`, {}), context.theme.colors)
  }

  useEffect(() => {
    if (IS_DEV && IS_BROWSER) {
      // const id = uuid()
      window.__THEME_UI__ = context
    }
  }, [])

  return context
}

export const Provider = ({
  theme,
  components,
  children,
}) => {
  const context = useThemeContext({ theme })
  console.log(context)

  return jsx(Emotion.Provider, { value: context.theme },
    jsx(MDXProvider, { components },
      jsx(Context.Provider, { value: context },
        children
      )
    )
  )
}
