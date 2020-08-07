import { ThemeUIStyleObject } from '@theme-ui/css'

/**
 * The `sx` prop accepts a `SxStyleProp` object and properties that are part of
 * the `Theme` will be transformed to their corresponding values. Other valid
 * CSS properties are also allowed.
 */
export type SxStyleProp = ThemeUIStyleObject

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

export type SxElements =
  'p' | 'b' | 'i' | 'a' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'img' | 'pre' | 'code' | 'ol' | 'ul' | 'li' | 'blockquote' | 'hr' | 'table' | 'tr' | 'th' | 'td' | 'em' | 'strong' | 'div'

export type IntrinsicSxElements = {
  [key in SxElements]: JSX.IntrinsicElements[key] & SxProps
} & {
  del: JSX.IntrinsicElements['div'] & SxProps
  inlineCode: JSX.IntrinsicElements['div'] & SxProps
  thematicBreak: JSX.IntrinsicElements['div'] & SxProps
  root: JSX.IntrinsicElements['div'] & SxProps
}
