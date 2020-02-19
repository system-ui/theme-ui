import { SystemStyleObject } from '@theme-ui/css'

/**
 * The `sx` prop accepts a `SxStyleProp` object and properties that are part of
 * the `Theme` will be transformed to their corresponding values. Other valid
 * CSS properties are also allowed.
 */
export type SxStyleProp = SystemStyleObject

export interface SxProps {
  /**
   * The sx prop lets you style elements inline, using values from your
   * theme. To use the sx prop, add the custom pragma as a comment to the
   * top of your module and import the jsx function.
   *
   * ```ts
   * // @jsx jsx
   *
   * import { jsx } from 'theme-ui'
   * ```
   */
  sx?: SxStyleProp
}

export interface IntrinsicSxElements {
  p: JSX.IntrinsicElements['p'] & SxProps
  b: JSX.IntrinsicElements['b'] & SxProps
  i: JSX.IntrinsicElements['i'] & SxProps
  a: JSX.IntrinsicElements['a'] & SxProps
  h1: JSX.IntrinsicElements['h1'] & SxProps
  h2: JSX.IntrinsicElements['h2'] & SxProps
  h3: JSX.IntrinsicElements['h3'] & SxProps
  h4: JSX.IntrinsicElements['h4'] & SxProps
  h5: JSX.IntrinsicElements['h5'] & SxProps
  h6: JSX.IntrinsicElements['h6'] & SxProps
  img: JSX.IntrinsicElements['img'] & SxProps
  pre: JSX.IntrinsicElements['pre'] & SxProps
  code: JSX.IntrinsicElements['code'] & SxProps
  ol: JSX.IntrinsicElements['ol'] & SxProps
  ul: JSX.IntrinsicElements['ul'] & SxProps
  li: JSX.IntrinsicElements['li'] & SxProps
  blockquote: JSX.IntrinsicElements['blockquote'] & SxProps
  hr: JSX.IntrinsicElements['hr'] & SxProps
  table: JSX.IntrinsicElements['table'] & SxProps
  tr: JSX.IntrinsicElements['tr'] & SxProps
  th: JSX.IntrinsicElements['th'] & SxProps
  td: JSX.IntrinsicElements['td'] & SxProps
  em: JSX.IntrinsicElements['em'] & SxProps
  strong: JSX.IntrinsicElements['strong'] & SxProps
  div: JSX.IntrinsicElements['div'] & SxProps
  delete: JSX.IntrinsicElements['div'] & SxProps
  inlineCode: JSX.IntrinsicElements['div'] & SxProps
  thematicBreak: JSX.IntrinsicElements['div'] & SxProps
  root: JSX.IntrinsicElements['div'] & SxProps
}
