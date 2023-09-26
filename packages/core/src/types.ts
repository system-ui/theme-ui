import { Interpolation } from '@emotion/react'
import {
  Scale,
  ScaleDict,
  ThemeUIStyleObject,
  Theme as ThemeUITheme,
} from '@theme-ui/css'

export interface UserThemes {}

/** @internal */
export type _UserTheme = UserThemes[keyof UserThemes]

/** Theme without array scales, so it's easier to read from inside of .sx prop */
export type WidenedTheme = {
  [P in keyof ThemeUITheme]: ThemeUITheme[P] extends Scale<infer R> | undefined
    ? ScaleDict<R>
    : ThemeUITheme[P]
} & ThemeUITheme

export type Theme<TTheme = {}> = _UserTheme extends never
  ? ThemeUITheme<TTheme>
  : _UserTheme

/** @internal */
export type _JSXTheme = _UserTheme extends never ? WidenedTheme : _UserTheme

export interface SxProp {
  /**
   * The sx prop lets you style elements inline, using values from your
   * theme.
   *
   * @see https://theme-ui.com/sx-prop/
   */
  sx?: ThemeUIStyleObject<_JSXTheme>
  /**
   * Theme UI uses Emotion's JSX function. You can pass styles to it directly
   * using `css` prop.
   * @see https://theme-ui.com/sx-prop/#raw-css
   */
  css?: Interpolation<ThemeUITheme>
}
