import {
  // @ts-ignore
  jsx as emotionJsx,
  // @ts-ignore
  jsxs as emotionJsxs,
} from '@emotion/react/jsx-runtime'
import { ThemeUIJSX } from './jsx-namespace'
import { parseProps } from './parseProps'
import type { ElementType } from 'react'

export { Fragment } from 'react'
export type { ThemeUIJSX as JSX } from './jsx-namespace'

export const jsx = <P>(
  type: ElementType<P>,
  props: P,
  key?: string
): ThemeUIJSX.Element => emotionJsx(type, parseProps(props), key)

export const jsxs = <P>(
  type: ElementType<P>,
  props: P,
  key?: string
): ThemeUIJSX.Element => emotionJsxs(type, parseProps(props), key)
