import { Interpolation } from '@emotion/react'
import { ThemeUIStyleObject, Theme as ThemeUITheme } from '@theme-ui/css'

import { ThemeUIJSX } from './jsx-namespace'

export interface SxProp {
  /**
   * The sx prop lets you style elements inline, using values from your
   * theme.
   *
   * @see https://theme-ui.com/sx-prop/
   */
  sx?: ThemeUIStyleObject
  /**
   * Theme UI uses Emotion's JSX function. You can pass styles to it directly
   * using `css` prop.
   * @see https://theme-ui.com/sx-prop/#raw-css
   */
  css?: Interpolation<ThemeUITheme>
}

export interface IntrinsicSxElements {
  p: ThemeUIJSX.IntrinsicElements['p']
  b: ThemeUIJSX.IntrinsicElements['b']
  i: ThemeUIJSX.IntrinsicElements['i']
  a: ThemeUIJSX.IntrinsicElements['a']
  h1: ThemeUIJSX.IntrinsicElements['h1']
  h2: ThemeUIJSX.IntrinsicElements['h2']
  h3: ThemeUIJSX.IntrinsicElements['h3']
  h4: ThemeUIJSX.IntrinsicElements['h4']
  h5: ThemeUIJSX.IntrinsicElements['h5']
  h6: ThemeUIJSX.IntrinsicElements['h6']
  img: ThemeUIJSX.IntrinsicElements['img']
  pre: ThemeUIJSX.IntrinsicElements['pre']
  code: ThemeUIJSX.IntrinsicElements['code']
  ol: ThemeUIJSX.IntrinsicElements['ol']
  ul: ThemeUIJSX.IntrinsicElements['ul']
  li: ThemeUIJSX.IntrinsicElements['li']
  blockquote: ThemeUIJSX.IntrinsicElements['blockquote']
  hr: ThemeUIJSX.IntrinsicElements['hr']
  table: ThemeUIJSX.IntrinsicElements['table']
  tr: ThemeUIJSX.IntrinsicElements['tr']
  th: ThemeUIJSX.IntrinsicElements['th']
  td: ThemeUIJSX.IntrinsicElements['td']
  em: ThemeUIJSX.IntrinsicElements['em']
  strong: ThemeUIJSX.IntrinsicElements['strong']
  div: ThemeUIJSX.IntrinsicElements['div']
  del: ThemeUIJSX.IntrinsicElements['div']
  inlineCode: ThemeUIJSX.IntrinsicElements['div']
  thematicBreak: ThemeUIJSX.IntrinsicElements['div']
  root: ThemeUIJSX.IntrinsicElements['div']
}
