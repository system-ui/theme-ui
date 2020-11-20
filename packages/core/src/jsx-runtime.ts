import {
  // @ts-ignore
  jsx as emotionJsx,
  // @ts-ignore
  jsxs as emotionJsxs,
} from '@emotion/react/jsx-runtime'
import parseProps from '@theme-ui/parse-props'

export const jsx: typeof emotionJsx = (type, props, key) =>
  emotionJsx(type, parseProps(props), key)

export const jsxs: typeof emotionJsxs = (type, props, key) =>
  emotionJsxs(type, parseProps(props), key)
