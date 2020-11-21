// @ts-ignore
import { jsxDEV as emotionJsxDEV } from '@emotion/react/jsx-dev-runtime'
import parseProps from '@theme-ui/parse-props'
export type { ThemeUIJSX as JSX } from './jsx-namespace'

export const jsxDEV: typeof emotionJsxDEV = (
  type,
  props,
  key,
  isStaticChildren,
  source,
  self
) => emotionJsxDEV(type, parseProps(props), key, isStaticChildren, source, self)
