// @ts-ignore
import { jsxDEV as emotionJsxDEV } from '@emotion/react/jsx-dev-runtime'
import parseProps from '@theme-ui/parse-props'
import { ThemeUIJSX } from './jsx-namespace'

export { Fragment } from 'react'
export type { ThemeUIJSX as JSX } from './jsx-namespace'

export const jsxDEV = <P>(
  type: React.ElementType<P>,
  props: P,
  key: string | undefined,
  isStaticChildren: boolean,
  source: {
    filename: string
    lineNumber: number
    columnNumber: number
  },
  self: any
): ThemeUIJSX.Element =>
  emotionJsxDEV(type, parseProps(props), key, isStaticChildren, source, self)
