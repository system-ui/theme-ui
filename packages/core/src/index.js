import {
  jsx as emotion,
  ThemeContext as EmotionContext,
} from '@emotion/core'
import { css, get } from '@theme-ui/css'
import { createContext, useContext } from 'react'
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

// new api
//  <ThemeProvider theme={theme}>
//  <ColorModeProvider>
//  <ComponentsProvider components={components}>

export const ThemeProvider = ({
  theme,
  children
}) => {
  // todo: figure out
  // color modes?
  // custom properties
  // mdx components
  const outer = useThemeUI()
  const context = {
    ...outer,
    theme: typeof theme === 'function'
      ? theme(outer.theme)
      : merge.all({}, outer.theme, theme)
  }
  return jsx(BaseProvider, {
    children
  })
}
