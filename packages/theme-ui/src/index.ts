import {
  jsx as coreJsx,
  ThemeUIJSX,
  type ThemeUIStyleObject,
} from '@theme-ui/core'
import React from 'react'
import BaseThemeProvider, {
  type ThemeProviderProps,
} from '@theme-ui/theme-provider'
export {
  __ThemeUIContext,
  merge,
  useThemeUI,
  createElement,
} from '@theme-ui/core'
export type {
  ThemeUIContextValue,
  SxProp,
  ColorMode,
  ColorModesScale,
  CSSObject,
  CSSProperties,
  CSSPseudoSelectorProps,
  ResponsiveStyleValue,
  ThemeUICSSProperties,
  ThemeUIStyleObject,
  ThemeUICSSObject,
  Theme,
  ThemeStyles,
  TLengthStyledSystem,
  StylePropertyValue,
} from '@theme-ui/core'
export { useColorMode, InitializeColorMode } from '@theme-ui/color-modes'
export * from '@theme-ui/components'
export { css, get } from '@theme-ui/css'

/** @deprecated This export has been renamed ThemeUIProvider */
export function ThemeProvider(
  props: ThemeProviderProps
): typeof BaseThemeProvider {
  console.warn(
    '[theme-ui] The export <ThemeProvider> is deprecated; it’s now called ThemeUIProvider to reduce confusion. Please update your imports.'
  )
  return React.createElement(BaseThemeProvider, props)
}

export { BaseThemeProvider as ThemeUIProvider }

export const BaseStyles = (
  props: Record<string, unknown> & { sx?: ThemeUIStyleObject }
): JSX.Element =>
  jsx('div', {
    ...props,
    sx: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      variant: 'styles',
      ...props.sx,
    },
  })

export const jsx = coreJsx

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
    export interface IntrinsicElements extends ThemeUIJSX.IntrinsicElements {}
  }
}
