import type * as CSS from 'csstype'
import type { AliasesCSSProperties } from './aliases'
import type { ScalesCSSProperties } from './scales'
import type { MultiplesCSSProperties } from './multiples'

import type {} from '../emotion-theme'

export type { CSSObject } from '@emotion/react'

export interface ResponsiveStyleTuple<T> extends Array<T | null | undefined> {}

export type ThemeUIEmpty = undefined | null | false

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 *
 * For more information see: https://styled-system.com/responsive-styles
 */
export type ResponsiveStyleValue<T> =
  | T
  | ThemeUIEmpty
  | ResponsiveStyleTuple<T | ThemeUIEmpty>

/**
 * All non-vendor-prefixed CSS properties. (Allow `number` to support CSS-in-JS libs,
 * since they are converted to pixels)
 */
export interface CSSProperties
  extends CSS.StandardProperties<number | string>,
    CSS.SvgProperties<number | string>,
    CSS.VendorProperties<number | string> {}

/**
 * Map of all CSS pseudo selectors (`:hover`, `:focus`, ...)
 */
export type CSSPseudoSelectorProps = { [K in CSS.Pseudos]?: ThemeUIStyleObject }

/**
 * Can be augmented by users to inject their exact theme into Theme UI types.
 * @see TODO LINK TO THE DOCS
 */
export interface UserTheme {}

export interface Theme extends Assign<BaseTheme, UserTheme> {}

export type Assign<T, U> = {
  [P in keyof (T & U)]: P extends keyof U
    ? U[P]
    : P extends keyof T
    ? T[P]
    : never
}

/**
 * Map of all available CSS properties (including aliases and overwrites)
 * and their raw value.
 */
export interface ThemeUIExtendedCSSProperties
  extends Omit<CSSProperties, keyof ScalesCSSProperties>,
    AliasesCSSProperties,
    MultiplesCSSProperties,
    ScalesCSSProperties {}

export type DerivedStylePropertyValue<T> = (
  theme: Theme
) => ResponsiveStyleValue<Exclude<T, undefined>> | undefined

type ThemeUIStyleValue<T> = ResponsiveStyleValue<T | ObjectWithDefault<T>>

export type StylePropertyValue<T> =
  | ThemeUIStyleValue<Exclude<T, undefined>>
  | ((theme: Theme) => ThemeUIStyleValue<Exclude<T, undefined>> | undefined)
  | ThemeUIStyleObject
  | ThemeUIEmpty

export type ThemeUICSSProperties = {
  [K in keyof ThemeUIExtendedCSSProperties]: StylePropertyValue<
    ThemeUIExtendedCSSProperties[K]
  >
}

export interface VariantProperty {
  /**
   * **`Variants`** can be useful for applying complex styles to a component based on a single prop.
   *
   * @example
   * const theme = {
   *   buttons: {
   *     primary: {
   *       p: 3,
   *       fontWeight: 'bold',
   *       color: 'white',
   *       bg: 'primary',
   *       borderRadius: 2,
   *     },
   *   },
   * }
   * const result = css({
   *   variant: 'buttons.primary',
   * })(theme)
   *
   * @see https://styled-system.com/variants
   */
  variant?: string
}

export interface ThemeDerivedStyles {
  (theme: Theme): ThemeUICSSObject
}

export type Label = {
  label?: string
}

export interface CSSOthersObject {
  // we want to match CSS selectors
  // but index signature needs to be a supertype
  // so as a side-effect we allow unknown CSS properties (Emotion does too)
  [k: string]: StylePropertyValue<string | number | ThemeUIEmpty>
}

export interface ThemeUICSSObject
  extends ThemeUICSSProperties,
    CSSPseudoSelectorProps,
    CSSOthersObject,
    VariantProperty,
    Label {}

/**
 * The `ThemeUIStyleObject` extends [style props](https://emotion.sh/docs/object-styles)
 * such that properties that are part of the `Theme` will be transformed to
 * their corresponding values. Other valid CSS properties are also allowed.
 */
export type ThemeUIStyleObject = ThemeUICSSObject | ThemeDerivedStyles

export type TLengthStyledSystem = string | 0 | number

export interface ScaleDict<T> {
  [K: string]: T | T[] | NestedScaleDict<T> | undefined
  [I: number]: T
}

export interface ObjectWithDefault<T> {
  /**
   * Default value in nested scale.
   *
   * Given theme
   * ```
   * {
   *   colors: {
   *     primary: { __default: '#00f', light: '#33f' }
   *   }
   * }
   * ```
   * `sx={{ color: 'primary' }}` resolves to `color: #00f`.
   */
  __default?: T
}

export interface NestedScaleDict<T>
  extends ScaleDict<T>,
    ObjectWithDefault<T> {}

/**
 * An array or object (possibly nested) of related CSS properties
 * @see https://theme-ui.com/theme-spec#theme-scales
 */
export type Scale<T> = (T | ThemeUIEmpty)[] | ScaleDict<T | ThemeUIEmpty>

export type NestedScale<T> = T[] | NestedScaleDict<T>

export declare namespace ColorMode {
  // We won't autocomplete "mediumseagreen" inside of `sx` prop, because
  // csstype's Property.Color is a huge union of literals you didn't include
  // in your theme. That would be a tiny sabotage, right?
  // Nevertheless, it's convenient to have them inside of the colors scale.
  export type ColorValue = CSS.Property.Color
  export type ColorOrNestedScale =
    | ColorValue
    | NestedScale<CSS.Property.Color | ThemeUIEmpty>
    | ThemeUIEmpty
}

/**
 * Color modes can be used to create a user-configurable dark mode
 * or any number of other color modes.
 */
export interface ColorMode extends ScaleDict<ColorMode.ColorOrNestedScale> {
  /**
   * Body background color
   */
  background?: ColorMode.ColorOrNestedScale

  /**
   * Body foreground color
   */
  text?: ColorMode.ColorOrNestedScale

  /**
   * Primary brand color for links, buttons, etc.
   */
  primary?: ColorMode.ColorOrNestedScale

  /**
   * A secondary brand color for alternative styling
   */
  secondary?: ColorMode.ColorOrNestedScale

  /**
   * A contrast color for emphasizing UI
   */
  accent?: ColorMode.ColorOrNestedScale

  /**
   * A background color for highlighting text
   */
  highlight?: ColorMode.ColorOrNestedScale

  /**
   * A faint color for backgrounds, borders, and accents that do not require
   * high contrast with the background color
   */
  muted?: ColorMode.ColorOrNestedScale
}

export type ColorModesScale = ColorMode & {
  /**
   * Nested color modes can provide overrides when used in conjunction with
   * `Theme.initialColorModeName and `useColorMode()`
   */
  modes?: {
    [k: string]: ColorMode
  }
}

export interface ThemeStyles {
  tr?: ThemeUIStyleObject
  th?: ThemeUIStyleObject
  td?: ThemeUIStyleObject
  em?: ThemeUIStyleObject
  strong?: ThemeUIStyleObject
  div?: ThemeUIStyleObject
  p?: ThemeUIStyleObject
  b?: ThemeUIStyleObject
  i?: ThemeUIStyleObject
  a?: ThemeUIStyleObject
  h1?: ThemeUIStyleObject
  h2?: ThemeUIStyleObject
  h3?: ThemeUIStyleObject
  h4?: ThemeUIStyleObject
  h5?: ThemeUIStyleObject
  h6?: ThemeUIStyleObject
  img?: ThemeUIStyleObject
  pre?: ThemeUIStyleObject
  code?: ThemeUIStyleObject
  ol?: ThemeUIStyleObject
  ul?: ThemeUIStyleObject
  li?: ThemeUIStyleObject
  blockquote?: ThemeUIStyleObject
  hr?: ThemeUIStyleObject
  table?: ThemeUIStyleObject
  delete?: ThemeUIStyleObject
  inlineCode?: ThemeUIStyleObject
  thematicBreak?: ThemeUIStyleObject
  root?: ThemeUIStyleObject
  [key: string]: ThemeUIStyleObject | undefined
}

export interface BaseTheme {
  breakpoints?: Array<string>
  mediaQueries?: { [size: string]: string }
  space?: Scale<CSS.Property.Margin<number | string>>
  fontSizes?: Scale<CSS.Property.FontSize<number>>
  fonts?: Scale<CSS.Property.FontFamily>
  fontWeights?: Scale<CSS.Property.FontWeight>
  lineHeights?: Scale<CSS.Property.LineHeight<TLengthStyledSystem>>
  letterSpacings?: Scale<CSS.Property.LetterSpacing<TLengthStyledSystem>>
  sizes?: Scale<CSS.Property.Height<number> | CSS.Property.Width<number>>
  borders?: Scale<CSS.Property.Border>
  borderStyles?: Scale<CSS.Property.Border>
  borderWidths?: Scale<CSS.Property.BorderWidth<TLengthStyledSystem>>
  radii?: Scale<CSS.Property.BorderRadius<TLengthStyledSystem>>
  shadows?: Scale<CSS.Property.BoxShadow>
  zIndices?: Scale<CSS.Property.ZIndex>
  colorStyles?: Scale<ThemeUICSSProperties>
  textStyles?: Scale<ThemeUICSSProperties>
  opacities?: Scale<CSS.Property.Opacity>
  transitions?: Scale<CSS.Property.Transition>

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
   * Provide a value here to set a color mode for printing
   */
  printColorModeName?: string

  /**
   * Adds styles defined in theme.styles.root to the <html> element along with color and background-color
   */
  useRootStyles?: boolean

  /**
   * @deprecated Deprecated in favor of `useRootStyles`.
   *
   * Adds styles defined in theme.styles.root to the <body> element along with color and background-color
   */
  useBodyStyles?: boolean

  /**
   * Initializes the color mode based on the prefers-color-scheme media query
   */
  useColorSchemeMediaQuery?: boolean

  /**
   * Adds a global box-sizing: border-box style
   */
  useBorderBox?: boolean

  /**
   * If false, does not save color mode as a localStorage value.
   */
  useLocalStorage?: boolean

  /**
   * Other options
   */
  options?: {
    strictMode?: {
      /**
       * If false, (string & {}) is accepted as style value.
       * If true, all values need to be taken from scales.
       * @default false
       */
      noStrings?: boolean
    }
  }

  /**
   * Define the colors that are available through this theme
   */
  colors?: ColorModesScale

  /**
   * Styles for elements rendered in MDX can be added to the theme.styles
   * object. This is the primary, low-level way to control typographic and
   * other styles in markdown content. Styles within this object are processed
   * with @styled-system/css and have access to base theme values like colors,
   * fonts, etc.
   */
  styles?: ThemeStyles

  /**
   * You can define additional CSS grid layouts by adding variants to the
   * `theme.grids` object. These styles can be used to create a wide variety of
   * different reusable layouts.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/grid#variants
   */
  grids?: Record<string, ThemeUIStyleObject>

  /**
   * Button variants can be defined in the `theme.buttons` object. The `Button`
   * component uses `theme.buttons.primary` as its default variant style.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/button#variants
   */
  buttons?: Record<string, ThemeUIStyleObject>

  /**
   * Text style variants can be defined in the `theme.text` object. The `Text`
   * component uses `theme.text.default` as its default variant style.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/text#variants
   */
  text?: Record<string, ThemeUIStyleObject>

  /**
   * Link variants can be defined in the `theme.links` object. By default the
   * `Link` component will use styles defined in `theme.styles.a`.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/link#variants
   */
  links?: Record<string, ThemeUIStyleObject>

  /**
   * Image style variants can be defined in the `theme.images` object.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/image#variants
   */
  images?: Record<string, ThemeUIStyleObject>

  /**
   * Card style variants can be defined in `the theme.cards` object. By default
   * the `Card` component uses the `theme.cards.primary` variant.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/card#variants
   */
  cards?: Record<string, ThemeUIStyleObject>

  /**
   * Container variants can be defined in the `theme.layout` object. The
   * `Container` component uses `theme.layout.container` as its default variant
   * style.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/container#variants
   */
  layout?: Record<string, ThemeUIStyleObject>

  /**
   * Label variants can be defined in `theme.forms` and the component uses the
   * `theme.forms.label` variant by default.
   *
   * Input variants can be defined in `theme.forms` and the component uses the
   * `theme.forms.input` variant by default.
   *
   * Select variants can be defined in `theme.forms` and the component uses the
   * `theme.forms.select` variant by default.
   *
   * Textarea variants can be defined in `theme.forms` and the component uses
   * the `theme.forms.textarea` variant by default.
   *
   * Radio variants can be defined in `theme.forms` and the component uses the
   * `theme.forms.radio` variant by default.
   *
   * Checkbox variants can be defined in `theme.forms` and the component uses
   * the `theme.forms.checkbox` variant by default.
   *
   * Slider variants can be defined in the `theme.forms` object. The `Slider`
   * component uses `theme.forms.slider` as its default variant style.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/label#variants
   * @see https://theme-ui.com/components/input#variants
   * @see https://theme-ui.com/components/select#variants
   * @see https://theme-ui.com/components/textarea#variants
   * @see https://theme-ui.com/components/radio#variants
   * @see https://theme-ui.com/components/checkbox#variants
   * @see https://theme-ui.com/components/slider#variants
   */
  forms?: Record<string, ThemeUIStyleObject>

  /**
   * Badge variants can be defined in `theme.badges`. The `Badge` component uses
   * `theme.badges.primary` as its default variant.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/badge#variants
   */
  badges?: Record<string, ThemeUIStyleObject>

  /**
   * Alert variants can be defined in `theme.alerts`. The `Alert` component uses
   * `theme.alerts.primary` as its default variant.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/alert#variants
   */
  alerts?: Record<string, ThemeUIStyleObject>

  /**
   * Message variants can be defined in the `theme.messages` object.
   *
   * @see https://theme-ui.com/theme-spec#variants
   * @see https://theme-ui.com/components/variants
   * @see https://theme-ui.com/components/message#variants
   */
  messages?: Record<string, ThemeUIStyleObject>
}
