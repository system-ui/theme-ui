import * as CSS from 'csstype'

import type { ThemeUIConfig } from './options'

export type { CSSObject } from '@emotion/react'

type StandardCSSProperties = CSS.Properties<number | string>

/**
 * Style properties with value of undefined, null or false are ignored.
 */
export type ThemeUIEmpty = undefined | null | false

/**
 * The `css` function accepts arrays as values for mobile-first responsive styles.
 * Note that this extends to non-theme values also. For example `display=['none', 'block']`
 * will also works.
 *
 * For more information see: https://styled-system.com/responsive-styles
 */
export type ResponsiveStyleValue<T> = T | ThemeUIEmpty | Array<T | ThemeUIEmpty>

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

interface AliasesCSSProperties {
  /**
   * The **`background-color`** CSS property sets the background color of an element.
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-color
   */
  bg?: StandardCSSProperties['backgroundColor']
  /**
   * The **`margin`** CSS property sets the margin area on all four sides of an element. It is a shorthand for `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin
   */
  m?: StandardCSSProperties['margin']
  /**
   * The **`margin-top`** CSS property sets the margin area on the top of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   */
  mt?: StandardCSSProperties['marginTop']
  /**
   * The **`margin-right`** CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  mr?: StandardCSSProperties['marginRight']
  /**
   * The **`margin-bottom`** CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  mb?: StandardCSSProperties['marginBottom']
  /**
   * The **`margin-left`** CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  ml?: StandardCSSProperties['marginLeft']
  /**
   * The **`mx`** is shorthand for using both **`margin-left`** and **`margin-right`** CSS properties. They set the margin area on the left and right side of an element. A positive value placesit
   * farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://styled-system.com/#margin-props
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  mx?: StandardCSSProperties['marginLeft']
  /**
   * The **`marginX`** is shorthand for using both **`margin-left`** and **`margin-right`** CSS properties. They set the margin area on the left and right side of an element. A positive value
   * places it farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://styled-system.com/#margin-props
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  marginX?: StandardCSSProperties['marginLeft']
  /**
   * The **`my`** is shorthard for using both **`margin-top`** and **`margin-bottom`** CSS properties. They set the margin area on the top and bottom of an element. A positive value places it
   * farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://styled-system.com/#margin-props
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  my?: StandardCSSProperties['marginTop']
  /**
   * The **`marginY`** is shorthard for using both **`margin-top`** and **`margin-bottom`** CSS properties. They set the margin area on the top and bottom of an element. A positive value places
   * it farther from its neighbors, while a negative value places it closer.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://styled-system.com/#margin-props
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  marginY?: StandardCSSProperties['marginTop']
  /**
   * The **`padding`** CSS property sets the padding area on all four sides of an element. It is a shorthand for `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding
   */
  p?: StandardCSSProperties['padding']
  /**
   * The **`padding-top`** padding area on the top of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  pt?: StandardCSSProperties['paddingTop']
  /**
   * The **`padding-right`** CSS property sets the width of the padding area on the right side of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  pr?: StandardCSSProperties['paddingRight']
  /**
   * The **`padding-bottom`** CSS property sets the height of the padding area on the bottom of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  pb?: StandardCSSProperties['paddingBottom']
  /**
   * The **`padding-left`** CSS property sets the width of the padding area on the left side of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  pl?: StandardCSSProperties['paddingLeft']
  /**
   * The **`px`** is shorthand property for CSS properties **`padding-left`** and **`padding-right`**. They set the width of the padding area on the left and right side of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://styled-system.com/#padding-props
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  px?: StandardCSSProperties['paddingLeft']
  /**
   * The **`paddingX`** is shorthand property for CSS properties **`padding-left`** and **`padding-right`**. They set the width of the padding area on the left and right side of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://styled-system.com/#padding-props
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  paddingX?: StandardCSSProperties['paddingLeft']
  /**
   * The **`py`** is shorthand property for CSS properties **`padding-top`** and **`padding-bottom`**. They set the width of the padding area on the top and bottom of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://styled-system.com/#padding-props
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  py?: StandardCSSProperties['paddingTop']
  /**
   * The **`paddingY`** is shorthand property for CSS properties **`padding-top`** and **`padding-bottom`**. They set the width of the padding area on the top and bottom of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://styled-system.com/#padding-props
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  paddingY?: StandardCSSProperties['paddingTop']
  // TODO: Move me to `MultiplesCSSProperties type and colocate it with the
  // multiples object possibly.
  /**
   * The **`size`** is a shorthand property for CSS properties **`width`** and **`height`**.
   *
   * @see https://theme-ui.com/sx-prop#theme-aware-properties
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   * @see https://developer.mozilla.org/docs/Web/CSS/height
   */

  /**
   * The **`scrollMarginX`** is shorthand property for CSS properties **`scroll-margin-left`** and **`scroll-margin-right`**. They set the margin of the scroll snap area that is used for snapping the element to the snapport.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-left
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-right
   */
  scrollMarginX?: StandardCSSProperties['scrollMarginLeft']

  /**
   * The **`scrollMarginY`** is shorthand property for CSS properties **`scroll-margin-top`** and **`scroll-margin-bottom`**. They set the margin of the scroll snap area that is used for snapping the element to the snapport.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-top
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin-bottom
   */
  scrollMarginY?: StandardCSSProperties['scrollMarginTop']

  /**
   * The **`scrollPaddingX`** is shorthand property for CSS properties **`scroll-padding-left`** and **`scroll-padding-right`**. They set the width of the scroll padding area on the left and right side of an element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-left
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-right
   */
  scrollPaddingX?: StandardCSSProperties['scrollPaddingLeft']

  /**
   * The **`scrollPaddingY`** is shorthand property for CSS properties **`scroll-padding-top`** and **`scroll-padding-bottom`**. They set the width of the scroll padding area on the top and bottom side of an element.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-top
   * @see https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-padding-bottom
   */
  scrollPaddingY?: StandardCSSProperties['scrollPaddingTop']
  size?: StandardCSSProperties['width']
}

interface OverwriteCSSProperties {
  /**
   * The **`box-shadow`** CSS property adds shadow effects around an element's frame. You can set multiple effects separated by commas. A box shadow is described by X and Y offsets relative to the
   * element, blur and spread radii, and color.
   *
   * **Initial value**: `none`
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * | **10**  |  **4**  | **5.1** | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/box-shadow
   */
  boxShadow?: CSS.Property.BoxShadow | number
  /**
   * The **`font-weight`** CSS property specifies the weight (or boldness) of the font. The font weights available to you will depend on the `font-family` you are using. Some fonts are only
   * available in `normal` and `bold`.
   *
   * **Initial value**: `normal`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **2**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/font-weight
   */
  fontWeight?: CSS.Property.FontWeight | string

  /**
   * The **`border-top-style`** CSS property sets the line style of an element's top `border`.
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-style
   */
  borderTopStyle?: CSS.Property.BorderTopStyle | string
  /**
   * The **`border-bottom-style`** CSS property sets the line style of an element's bottom `border`.
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-style
   */
  borderBottomStyle?: CSS.Property.BorderBottomStyle | string
  /**
   * The **`border-right-style`** CSS property sets the line style of an element's right `border`.
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-style
   */
  borderRightStyle?: CSS.Property.BorderRightStyle | string
  /**
   * The **`border-left-style`** CSS property sets the line style of an element's left `border`.
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-style
   */
  borderLeftStyle?: CSS.Property.BorderLeftStyle | string
  /**
   * The **`border-radius`** CSS property rounds the corners of an element's outer border edge. You can set a single radius to make circular corners, or two radii to make elliptical corners.
   *
   * | Chrome  | Firefox | Safari  |  Edge  |  IE   |
   * | :-----: | :-----: | :-----: | :----: | :---: |
   * |  **4**  |  **4**  |  **5**  | **12** | **9** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |       |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-radius
   */
  borderRadius?: CSS.Property.BorderRadius<string | number>

  /**
   * The **`z-index`** CSS property sets the z-order of a positioned element and its descendants or flex items. Overlapping elements with a larger z-index cover those with a smaller one.
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/z-index
   */
  zIndex?: CSS.Property.ZIndex | string
}

/**
 * Map of all available CSS properties (including aliases and overwrites)
 * and their raw value.
 */
export interface ThemeUIExtendedCSSProperties
  extends Omit<CSSProperties, keyof OverwriteCSSProperties>,
    AliasesCSSProperties,
    OverwriteCSSProperties {}

type ThemeUIStyleValue<T> = ResponsiveStyleValue<T | ObjectWithDefault<T> | T[]>

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

export interface Label {
  /**
   * String appended to generated class name.
   * @see https://emotion.sh/docs/labels
   *
   * You can style HTML <label> elements with `"& label": {}`.
   */
  label?: string
}

export interface CSSOthersObject {
  // we want to match CSS selectors
  // but index signature needs to be a supertype
  // so as a side-effect we allow unknown CSS properties (Emotion does too)
  [k: string]: StylePropertyValue<string | number>
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
export type Scale<T> = T[] | ScaleDict<T>

export type NestedScale<T> = T[] | NestedScaleDict<T>

export type ColorOrNestedColorScale =
  | CSS.Property.Color
  | NestedScale<CSS.Property.Color>

/**
 * Color modes can be used to create a user-configurable dark mode
 * or any number of other color modes.
 */
export interface ColorMode extends ScaleDict<CSS.Property.Color> {
  /**
   * Body background color
   */
  background?: ColorOrNestedColorScale

  /**
   * Body foreground color
   */
  text?: ColorOrNestedColorScale

  /**
   * Primary brand color for links, buttons, etc.
   */
  primary?: ColorOrNestedColorScale

  /**
   * A secondary brand color for alternative styling
   */
  secondary?: ColorOrNestedColorScale

  /**
   * A contrast color for emphasizing UI
   */
  accent?: ColorOrNestedColorScale

  /**
   * A background color for highlighting text
   */
  highlight?: ColorOrNestedColorScale

  /**
   * A faint color for backgrounds, borders, and accents that do not require
   * high contrast with the background color
   */
  muted?: ColorOrNestedColorScale
}

export type ColorModesScale = ColorMode & {
  /**
   * Nested color modes can provide overrides when used in conjunction with
   * `Theme.initialColorModeName` and `useColorMode()`
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

export interface Theme {
  breakpoints?: Array<string>
  mediaQueries?: { [size: string]: string }
  space?: Scale<CSS.Property.Margin<number | string>>
  fontSizes?: Scale<CSS.Property.FontSize<number>>
  fonts?: Scale<CSS.Property.FontFamily>
  fontWeights?: Scale<CSS.Property.FontWeight>
  lineHeights?: Scale<CSS.Property.LineHeight<TLengthStyledSystem>>
  letterSpacings?: Scale<CSS.Property.LetterSpacing<TLengthStyledSystem>>
  sizes?: Scale<CSS.Property.Height<{}> | CSS.Property.Width<{}>>
  borders?: Scale<CSS.Property.Border<{}>>
  borderStyles?: Scale<CSS.Property.Border<{}>>
  borderWidths?: Scale<CSS.Property.BorderWidth<TLengthStyledSystem>>
  radii?: Scale<CSS.Property.BorderRadius<TLengthStyledSystem>>
  shadows?: Scale<CSS.Property.BoxShadow>
  zIndices?: Scale<CSS.Property.ZIndex>
  colorStyles?: Scale<ThemeUICSSProperties>
  textStyles?: Scale<ThemeUICSSProperties>
  opacities?: Scale<CSS.Property.Opacity>
  transitions?: Scale<CSS.Property.Transition>

  config?: ThemeUIConfig

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * Enable/disable custom CSS properties/variables if lower browser
   * support is required (for eg. IE 11).
   *
   * References: https://theme-ui.com/color-modes/#turn-off-custom-properties
   */
  useCustomProperties?: boolean

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * Provide a value here to enable color modes
   */
  initialColorModeName?: string

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * Provide a value here to set a color mode for printing
   */
  printColorModeName?: string

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * Adds styles defined in theme.styles.root to the <html> element along with color and background-color
   */
  useRootStyles?: boolean

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * Initializes the color mode based on the prefers-color-scheme media query
   */
  useColorSchemeMediaQuery?: boolean

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * Adds a global box-sizing: border-box style
   */
  useBorderBox?: boolean

  /**
   * @deprecated Deprecated in favor of nesting inside `config`
   *
   * If false, does not save color mode as a localStorage value.
   */
  useLocalStorage?: boolean

  /**
   * Define the colors that are available through this theme
   */
  colors?: ColorModesScale

  /**
   * Colors are transformed into CSS custom properties.
   *
   * If you need to read their raw values to pass them somewhere where CSS
   * custom properties are not supported, use `rawColors`.
   *
   * Additionally, you can access all the color modes in this objects.
   */
  rawColors?: ColorModesScale

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
