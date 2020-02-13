import * as CSS from 'csstype'
import { SystemStyleObject } from '@styled-system/css'
import { Theme as StyledSystemTheme } from 'styled-system'

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
type ObjectOrArray<T> = T[] | { [K: string]: T | ObjectOrArray<T> }
type StyledTags = keyof IntrinsicSxElements

/**
 * To use Theme UI color modes, color scales should include at least a text
 * and background color. These values are used in the ColorMode component to
 * set body foreground and background colors. Color modes should be defined as
 * nested objects within a theme.colors.modes object. Each key in this object
 * should correspond to a color mode name, where the name can be anything, but
 * typically light and dark are used for applications with a dark mode. The
 * initialColorModeName key is required to enable color modes and will be used as
 * the name for the root color palette.
 */
export type ColorMode = {
  [k: string]: CSS.ColorProperty | ObjectOrArray<CSS.ColorProperty>
} & {
  /**
   * Body background color
   */
  background: CSS.ColorProperty

  /**
   * Body foreground color
   */
  text: CSS.ColorProperty

  /**
   * Primary brand color for links, buttons, etc.
   */
  primary?: CSS.ColorProperty

  /**
   * A secondary brand color for alternative styling
   */
  secondary?: CSS.ColorProperty

  /**
   * A faint color for backgrounds, borders, and accents that do not require
   * high contrast with the background color
   */
  muted?: CSS.ColorProperty

  /**
   * A contrast color for emphasizing UI
   */
  accent?: CSS.ColorProperty
}

export interface Theme extends Omit<StyledSystemTheme, 'colors'> {
  /**
   * Enable/disable custom CSS properties/variables if lower browser
   * support is required (for eg. IE 11).
   *
   * References: https://theme-ui.com/color-modes/#turn-off-custom-properties
   */
  useCustomProperties?: boolean

  /**
   * Provide a value here to enable color modes
   */
  initialColorModeName?: string

  /**
   * Define the colors that are available through this theme
   */
  colors?: ColorMode & {
    /**
     * Nested color modes can provide overrides when used in conjunction with
     * `Theme.initialColorModeName and `useColorMode()`
     */
    modes?: {
      [k: string]: ColorMode
    }
  }

  /**
   * Styles for elements rendered in MDX can be added to the theme.styles
   * object. This is the primary, low-level way to control typographic and
   * other styles in markdown content. Styles within this object are processed
   * with @styled-system/css and have access to base theme values like colors,
   * fonts, etc.
   */
  styles?: {
    [P in StyledTags]?: SystemStyleObject
  }
}
