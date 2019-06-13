// window object hook for use in devtools
import React, {
  useEffect,
  useReducer
} from 'react'

const IS_DEV = process.env.NODE_ENV !== 'production'
const IS_BROWSER = typeof window !== 'undefined'

let __id = 0
const uuid = () => (__id++) + ''

const mergeReducer = (state, next) => Object.assign({}, state, next)

/*
export const useDevTool = (context) => {
  const [ state, setState ] = useReducer(mergeReducer, context.theme)

  let id = uuid()
  useEffect(() => {
    id = uuid()
  }, [])
  if (!IS_DEV) return context.theme
  window.__THEME_UI__ = window.__THEME_UI__ || {}

  window.__THEME_UI__[id] = {
    context,
    state,
    setState,
  }
  console.log(id, window.__THEME_UI__)
  return state
}
*/

// export let ThemeProvider =
