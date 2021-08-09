import {
  jsx as emotionJsx,
  ThemeContext as EmotionContext,
} from '@emotion/react'
import { Theme } from '@theme-ui/css'
import * as React from 'react'
import deepmerge from 'deepmerge'
import packageInfo from '@emotion/react/package.json'
import parseProps from '@theme-ui/parse-props'

import { ThemeUIJSX } from './jsx-namespace'
export type { ThemeUIJSX } from './jsx-namespace'

export type {
  CSSObject,
  CSSOthersObject,
  CSSProperties,
  CSSPseudoSelectorProps,
  ColorMode,
  ColorModesScale,
  Label,
  ResponsiveStyleValue,
  Scale,
  StylePropertyValue,
  TLengthStyledSystem,
  Theme,
  ThemeDerivedStyles,
  ThemeStyles,
  ThemeUICSSObject,
  ThemeUICSSProperties,
  ThemeUIExtendedCSSProperties,
  ThemeUIStyleObject,
  VariantProperty,
} from '@theme-ui/css'

export * from './types'

const __EMOTION_VERSION__ = packageInfo.version

export const jsx: typeof React.createElement = <P extends {}>(
  type: React.FunctionComponent<P> | React.ComponentClass<P> | string,
  props: React.Attributes & P,
  ...children: React.ReactNode[]
): any => emotionJsx(type, parseProps(props), ...children)

/**
 * @internal for Babel JSX pragma
 * @see https://github.com/system-ui/theme-ui/issues/1603
 */
export const createElement: unknown = jsx

export declare namespace jsx {
  export namespace JSX {
    export interface Element extends ThemeUIJSX.Element {}
    export interface ElementClass extends ThemeUIJSX.ElementClass {}
    export interface ElementAttributesProperty
      extends ThemeUIJSX.ElementAttributesProperty {}
    export interface ElementChildrenAttribute
      extends ThemeUIJSX.ElementChildrenAttribute {}
    export type LibraryManagedAttributes<C, P> =
      ThemeUIJSX.LibraryManagedAttributes<C, P>
    export interface IntrinsicAttributes
      extends ThemeUIJSX.IntrinsicAttributes {}
    export interface IntrinsicClassAttributes<T>
      extends ThemeUIJSX.IntrinsicClassAttributes<T> {}
    export type IntrinsicElements = ThemeUIJSX.IntrinsicElements
  }
}

export interface ThemeUIContextValue {
  __EMOTION_VERSION__: string
  theme: Theme
}

/**
 * @internal
 */
export const __themeUiDefaultContextValue: ThemeUIContextValue = {
  __EMOTION_VERSION__,
  theme: {},
}

/**
 * @internal
 */
export const __ThemeUIContext = React.createContext(
  __themeUiDefaultContextValue
)

export const useThemeUI = () => React.useContext(__ThemeUIContext)

const canUseSymbol = typeof Symbol === 'function' && Symbol.for

const REACT_ELEMENT = canUseSymbol ? Symbol.for('react.element') : 0xeac7
const FORWARD_REF = canUseSymbol ? Symbol.for('react.forward_ref') : 0xeac7

const deepmergeOptions: deepmerge.Options = {
  isMergeableObject: (n) => {
    return (
      !!n &&
      typeof n === 'object' &&
      (n as React.ExoticComponent).$$typeof !== REACT_ELEMENT &&
      (n as React.ExoticComponent).$$typeof !== FORWARD_REF
    )
  },
  arrayMerge: (_leftArray, rightArray) => rightArray,
}

/**
 * Deeply merge themes
 */
export const merge = (a: Theme, b: Theme): Theme =>
  deepmerge(a, b, deepmergeOptions)

function mergeAll<A, B>(a: A, B: B): A & B
function mergeAll<A, B, C>(a: A, B: B, c: C): A & B & C
function mergeAll<A, B, C, D>(a: A, B: B, c: C, d: D): A & B & C & D
function mergeAll<T = Theme>(...args: Partial<T>[]) {
  return deepmerge.all<T>(args, deepmergeOptions)
}

merge.all = mergeAll

export interface __ThemeUIInternalBaseThemeProviderProps {
  context: ThemeUIContextValue
  children: React.ReactNode
}
/**
 * @internal
 */
export const __ThemeUIInternalBaseThemeProvider = ({
  context,
  children,
}: __ThemeUIInternalBaseThemeProviderProps) =>
  jsx(
    EmotionContext.Provider,
    { value: context.theme },
    jsx(__ThemeUIContext.Provider, {
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
        'Please ensure there is only one copy of @emotion/react installed in your application.'
      )
    }
  }

  const context =
    typeof theme === 'function'
      ? { ...outer, theme: theme(outer.theme) }
      : merge.all({}, outer, { theme })

  return jsx(__ThemeUIInternalBaseThemeProvider, { context, children })
}
