import {
  jsx as emotionJsx,
  jsxs as emotionJsxs,
} from '@emotion/core/jsx-runtime'
import parseProps from '@theme-ui/parse-props'

export const jsx: typeof emotionJsx = (type, props, key) =>
  emotionJsx(type, parseProps(props), key)

export const jsxs: typeof emotionJsxs = (type, props, key) =>
  emotionJsxs(type, parseProps(props), key)
