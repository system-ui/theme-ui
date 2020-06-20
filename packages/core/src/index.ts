import {
  jsx as emotion,
  ThemeContext as EmotionContext,
  InterpolationWithTheme,
} from '@emotion/core'
// @ts-ignore
import { css, Theme, merge } from '@theme-ui/css'
import React from 'react'
import { version as __EMOTION_VERSION__ } from '@emotion/core/package.json'

import './react-jsx'

export * from './types'
export { merge } from '@theme-ui/css'

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
  theme: Theme
  colorMode?: string
  setColorMode?: () => void
}
export const Context = React.createContext<ContextValue>({
  __EMOTION_VERSION__,
  theme: {},
})

export const useThemeUI = () => React.useContext(Context)

interface BaseProviderProps {
  context: ContextValue
}
const BaseProvider: React.FC<BaseProviderProps> = ({ context, children }) =>
  jsx(
    EmotionContext.Provider,
    { value: context.theme },
    jsx(Context.Provider, {
      value: context,
      children,
    })
  )

export interface ThemeProviderProps {
  theme: Theme | ((outerTheme: Theme) => Theme)
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
      ? { ...outer, theme: theme(outer.theme) }
      : merge.all<ContextValue>({}, outer, { theme })

  return jsx(BaseProvider, { context }, children)
}
