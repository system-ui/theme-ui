import {
  // @ts-ignore
  jsx as emotionJsx,
  // @ts-ignore
  jsxs as emotionJsxs,
} from '@emotion/react/jsx-runtime'
import parseProps from '@theme-ui/parse-props'
export type { ThemeUIJSX as JSX } from './jsx-namespace'

export const jsx = <P>(type: React.ElementType<P>, props: P, key?: string) =>
  emotionJsx(type, parseProps(props), key)

export const jsxs = <P>(type: React.ElementType<P>, props: P, key?: string) =>
  emotionJsxs(type, parseProps(props), key)
