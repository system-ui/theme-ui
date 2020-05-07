import {
  jsx as emotion,
  ThemeContext as EmotionContext,
  InterpolationWithTheme,
} from '@emotion/core'
// @ts-ignore
import { css, Theme } from '@theme-ui/css'
import React from 'react'
import deepmerge from 'deepmerge'
import { version as __EMOTION_VERSION__ } from '@emotion/core/package.json'

import './react-jsx'

export * from './types'

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
  const next: typeof props & { css?: InterpolationWithTheme<any> } = {}
  for (let key in props) {
    if (key === 'sx') continue
    next[key] = props[key]
  }
  const css = getCSS(props)
  if (css) next.css = css
  return next
}

export const jsx: typeof React.createElement = (type, props, ...children) =>
  emotion.apply(undefined, [type, parseProps(props), ...children])

export interface ContextValue {
  __EMOTION_VERSION__: string
  theme: Theme | null
}
export const Context = React.createContext<ContextValue>({
  __EMOTION_VERSION__,
  theme: null,
})

export const useThemeUI = () => React.useContext(Context)

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

export const merge = <T>(a: Partial<T>, b: Partial<T>): T =>
  deepmerge(a, b, { isMergeableObject, arrayMerge })

merge.all = <T>(...args: Partial<T>[]) =>
  deepmerge.all<T>(args, { isMergeableObject, arrayMerge })

interface BaseProviderProps {
  context: ContextValue
}
const BaseProvider: React.FC<BaseProviderProps> = ({ context, children }) =>
  jsx(
    EmotionContext.Provider,
    { value: context.theme! },
    jsx(Context.Provider, {
      value: context,
      children,
    })
  )

export interface ThemeProviderProps {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
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
      ? { ...outer, theme: theme(outer.theme!) }
      : merge.all<ContextValue>({}, outer, { theme })

  return jsx(BaseProvider, { context }, children)
}
