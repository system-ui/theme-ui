import { jsx as emotion, ThemeContext as EmotionContext } from '@emotion/core'
import { css, get } from '@theme-ui/css'
import React from 'react'
import deepmerge from 'deepmerge'
import packageInfo from '@emotion/core/package.json'

const __EMOTION_VERSION__ = packageInfo.version

const getCSS = (props) => {
  if (!props.sx && !props.css) return undefined
  return (theme) => {
    const styles = css(props.sx)(theme)
    const raw = typeof props.css === 'function' ? props.css(theme) : props.css
    return [styles, raw]
  }
}

const parseProps = (props) => {
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

export const Context = React.createContext({
  __EMOTION_VERSION__,
  theme: null,
})

export const useThemeUI = () => React.useContext(Context)

const canUseSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_ELEMENT = canUseSymbol ? Symbol.for('react.element') : 0xeac7
const FORWARD_REF = canUseSymbol ? Symbol.for('react.forward_ref') : 0xeac7

const isMergeableObject = (n) => {
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
    EmotionContext.Provider,
    { value: context.theme },
    jsx(Context.Provider, {
      value: context,
      children,
    })
  )

export const ThemeProvider = ({ theme, children }) => {
  const outer = useThemeUI()

  if (process.env.NODE_ENV !== 'production') {
    if (outer.__EMOTION_VERSION__ !== __EMOTION_VERSION__) {
      console.warn(
        'Multiple versions of Emotion detected,',
        'and theming might not work as expected.',
        'Please ensure there is only one copy of @emotion/core installed in your application.'
      )
    }
  }

  const context =
    typeof theme === 'function'
      ? { ...outer, theme: theme(outer.theme) }
      : merge.all({}, outer, { theme })

  return jsx(BaseProvider, {
    context,
    children,
  })
}
