// @ts-ignore
import { jsxDEV as emotionJsxDEV } from '@emotion/react/jsx-dev-runtime'
import parseProps from '@theme-ui/parse-props'

export const jsxDEV: typeof emotionJsxDEV = (
  type,
  props,
  key,
  isStaticChildren,
  source,
  self
) => emotionJsxDEV(type, parseProps(props), key, isStaticChildren, source, self)
