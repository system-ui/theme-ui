import * as CSS from 'csstype'

import { FinalTheme } from './types'

import { Iteration, Object } from 'ts-toolbelt'

type StringOrNumber = string | number
type TokenValue = StringOrNumber
type IgnoredKeys = Exclude<keyof any[], number>

export type ScaleDottedPaths<
  O,
  I extends Iteration.Iteration = Iteration.IterationOf<'0'>
> = 9 extends Iteration.Pos<I>
  ? never
  : {
      [K in keyof O & StringOrNumber]: K extends IgnoredKeys
        ? never
        : O[K] extends null | undefined
        ? never
        : O[K] extends TokenValue
        ? `${K}`
        : `${K}.${ScaleDottedPaths<O[K], Iteration.Next<I>>}`
    }[keyof O & StringOrNumber]

// turns `string` to `string & {}` which can be part of a union
// we use this to allow autocomplete on css globals in non-strict mode
type StringHack<T> = string extends T ? Exclude<T, string> | (string & {}) : T

type AllowedStrings = Object.Path<
  FinalTheme,
  ['options', 'strictMode', 'allowStrings']
>

// TODO: test it
type StringEscapeHatch = AllowedStrings extends false ? never : string & {}
// if T contains stringified `${number}`, we add normal `number` for convenience
type AddNumberForConvenience<T> = `${number}` extends T ? T | number : T

type ScaleProperty<TScale> =
  | StringEscapeHatch
  | AddNumberForConvenience<
      StringHack<ScaleDottedPaths<Exclude<TScale, undefined>>>
    >

const colors: Record<keyof ColorScaleCSSProperties, 'colors'> = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  caretColor: 'colors',

  fill: 'colors',
  stroke: 'colors',

  borderTopColor: 'colors',
  borderBottomColor: 'colors',
  borderLeftColor: 'colors',
  borderRightColor: 'colors',

  outlineColor: 'colors',
}

export type Color =
  | Exclude<ScaleProperty<FinalTheme['colors']>, 'modes'>
  | 'currentColor'
  | CSS.Globals

export interface ColorScaleCSSProperties {
  /**
   * The **`color`** CSS property sets the foreground color value of an element's text and text decorations, and sets the `currentcolor` value. `currentcolor` may be used as an indirect value on _other_ properties and is the default for other color properties, such as `border-color`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: Varies from one browser to another
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/color
   */
  color?: Color

  /**const
   * The **`background-color`** CSS property sets the background color of an element.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `transparent`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/background-color
   */
  backgroundColor?: Color

  /**
   * The **`border-color`** shorthand CSS property sets the color of all sides of an element's border.
   *
   * **Syntax**: `<color>{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-color
   */
  borderColor?: Color

  /**
   * The **`caret-color`** CSS property sets the color of the insertion caret, the visible marker where the next character typed will be inserted. The caret appears in elements such as `<input>` or those with the `contenteditable` attribute. The caret is typically a thin vertical line that flashes to help make it more noticeable. By default, it is black, but its color can be altered with this property.
   *
   * **Syntax**: `auto | <color>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **53**  | **11.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/caret-color
   */
  caretColor?: Color
  /**
   * The **`border-top-color`** CSS property sets the color of an element's top border. It can also be set with the shorthand CSS properties `border-color` or `border-top`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-color
   */

  borderTopColor?: Color
  /**
   * The **`border-bottom-color`** CSS property sets the color of an element's bottom border. It can also be set with the shorthand CSS properties `border-color` or `border-bottom`.
   *
   * **Syntax**: `<'border-top-color'>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom-color
   */
  borderBottomColor?: Color
  /**
   * The **`border-left-color`** CSS property sets the color of an element's left border. It can also be set with the shorthand CSS properties `border-color` or `border-left`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left-color
   */
  borderLeftColor?: Color
  /**
   * The **`border-right-color`** CSS property sets the color of an element's right border. It can also be set with the shorthand CSS properties `border-color` or `border-right`.
   *
   * **Syntax**: `<color>`
   *
   * **Initial value**: `currentcolor`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right-color
   */
  borderRightColor?: Color
  /**
   * The **`outline-color`** CSS property sets the color of an element's outline.
   *
   * **Syntax**: `<color> | invert`
   *
   * **Initial value**: `invert`, for browsers supporting it, `currentColor` for the other
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  | **1.5** | **1.2** | **12** | **8** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/outline-color
   */
  outlineColor?: Color

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/fill
   */
  fill?: Color

  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke
   */
  stroke?: Color
}

const opacities: Record<keyof OpacitiesCSSProperties, 'opacities'> = {
  opacity: 'opacities',
}

export type Opacities = ScaleProperty<FinalTheme['opacities']>

export interface OpacitiesCSSProperties {
  /**
   * The **`opacity`** CSS property sets the transparency of an element or the degree to which content behind an element is visible.
   *
   * **Syntax**: `<alpha-value>`
   *
   * **Initial value**: `1.0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **2**  | **12** | **9** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/opacity
   */
  opacity?: Opacities
}

const space: Record<keyof SpaceCSSProperties, 'space'> = {
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
}

export type Space = ScaleProperty<FinalTheme['space']>

export interface SpaceCSSProperties {
  /**
   * The **`margin`** CSS property sets the margin area on all four sides of an element. It is a shorthand for `margin-top`, `margin-right`, `margin-bottom`, and `margin-left`.
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin
   */
  margin?: Space
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
  marginTop?: Space
  /**
   * The **`margin-right`** CSS property sets the margin area on the right side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  marginRight?: Space
  /**
   * The **`margin-bottom`** CSS property sets the margin area on the bottom of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  marginBottom?: Space
  /**
   * The **`margin-left`** CSS property sets the margin area on the left side of an element. A positive value places it farther from its neighbors, while a negative value places it closer.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **3** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   */
  marginLeft?: Space
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
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-left
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-right
   */
  marginX?: Space
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
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-top
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-bottom
   */
  marginY?: Space
  /**
   * The **`margin-block`** CSS property defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block
   */
  marginBlock?: Space
  /**
   * The **`margin-block-end`** CSS property defines the logical block end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block-end
   */
  marginBlockEnd?: Space
  /**
   * The **`margin-block-start`** CSS property defines the logical block start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-block-start
   */
  marginBlockStart?: Space
  /**
   * The **`margin-inline`** CSS property defines the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'margin-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline
   */
  marginInline?: Space
  /**
   * The **`margin-inline-end`** CSS property defines the logical inline end margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. In other words, it corresponds to the `margin-top`, `margin-right`, `margin-bottom` or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome          |        Firefox        |          Safari          |  Edge  | IE  |
   * | :----------------------: | :-------------------: | :----------------------: | :----: | :-: |
   * |          **69**          |        **41**         |         **12.1**         | **79** | No  |
   * | 2 _(-webkit-margin-end)_ | 3 _(-moz-margin-end)_ | 3 _(-webkit-margin-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline-end
   */
  marginInlineEnd?: Space
  /**
   * The **`margin-inline-start`** CSS property defines the logical inline start margin of an element, which maps to a physical margin depending on the element's writing mode, directionality, and text orientation. It corresponds to the `margin-top`, `margin-right`, `margin-bottom`, or `margin-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'margin-left'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome           |         Firefox         |           Safari           |  Edge  | IE  |
   * | :------------------------: | :---------------------: | :------------------------: | :----: | :-: |
   * |           **69**           |         **41**          |          **12.1**          | **79** | No  |
   * | 2 _(-webkit-margin-start)_ | 3 _(-moz-margin-start)_ | 3 _(-webkit-margin-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/margin-inline-start
   */
  marginInlineStart?: Space
  /**
   * The **`padding`** CSS property sets the padding area on all four sides of an element. It is a shorthand for `padding-top`, `padding-right`, `padding-bottom`, and `padding-left`.
   *
   * **Syntax**: `[ <length> | <percentage> ]{1,4}`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding
   */
  padding?: Space
  /**
   * The **`padding-top`** padding area on the top of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   */
  paddingTop?: Space
  /**
   * The **`padding-right`** CSS property sets the width of the padding area on the right side of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  paddingRight?: Space
  /**
   * The **`padding-bottom`** CSS property sets the height of the padding area on the bottom of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  paddingBottom?: Space
  /**
   * The **`padding-left`** CSS property sets the width of the padding area on the left side of an element.
   *
   * **Syntax**: `<length> | <percentage>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   */
  paddingLeft?: Space
  /**
   * The **`paddingX`** is shorthand property for CSS properties **`padding-left`** and **`padding-right`**. They set the width of the padding area on the left and right side of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-left
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-right
   */
  paddingX?: Space
  /**
   * The **`paddingY`** is shorthand property for CSS properties **`padding-top`** and **`padding-bottom`**. They set the width of the padding area on the top and bottom of an element.
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-top
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-bottom
   */
  paddingY?: Space
  /**
   * The **`padding-block`** CSS property defines the logical block start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'padding-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block
   */
  paddingBlock?: Space
  /**
   * The **`padding-block-end`** CSS property defines the logical block end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block-end
   */
  paddingBlockEnd?: Space
  /**
   * The **`padding-block-start`** CSS property defines the logical block start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-block-start
   */
  paddingBlockStart?: Space
  /**
   * The **`padding-inline`** CSS property defines the logical inline start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.
   *
   * **Syntax**: `<'padding-left'>{1,2}`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline
   */
  paddingInline?: Space
  /**
   * The **`padding-inline-end`** CSS property defines the logical inline end padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * |          Chrome           |        Firefox         |          Safari           |  Edge  | IE  |
   * | :-----------------------: | :--------------------: | :-----------------------: | :----: | :-: |
   * |          **69**           |         **41**         |         **12.1**          | **79** | No  |
   * | 2 _(-webkit-padding-end)_ | 3 _(-moz-padding-end)_ | 3 _(-webkit-padding-end)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline-end
   */
  paddingInlineEnd?: Space
  /**
   * The **`padding-inline-start`** CSS property defines the logical inline start padding of an element, which maps to a physical padding depending on the element's writing mode, directionality, and text orientation. It corresponds to the `padding-top`, `padding-right`, `padding-bottom`, or `padding-left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'padding-left'>`
   *
   * **Initial value**: `0`
   *
   * |           Chrome            |         Firefox          |           Safari            |  Edge  | IE  |
   * | :-------------------------: | :----------------------: | :-------------------------: | :----: | :-: |
   * |           **69**            |          **41**          |          **12.1**           | **79** | No  |
   * | 2 _(-webkit-padding-start)_ | 3 _(-moz-padding-start)_ | 3 _(-webkit-padding-start)_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/padding-inline-start
   */

  paddingInlineStart?: Space
  /**
   * The **`inset`** CSS property defines the logical block and inline start and end offsets of an element, which map to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,4}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **66**  |   No   |  No  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset
   */
  inset?: Space
  /**
   * The **`inset-block`** CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block
   */
  insetBlock?: Space
  /**
   * The **`inset-block-end`** CSS property defines the logical block end offset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block-end
   */
  insetBlockEnd?: Space
  /**
   * The **`inset-block-start`** CSS property defines the logical block start offset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-block-start
   */
  insetBlockStart?: Space
  /**
   * The **`inset-inline`** CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top` and `bottom`, or `right` and `left` properties depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>{1,2}`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline
   */
  insetInline?: Space
  /**
   * The **`inset-inline-end`** CSS property defines the logical inline end inset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline-end
   */
  insetInlineEnd?: Space
  /**
   * The **`inset-inline-start`** CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the `top`, `right`, `bottom`, or `left` property depending on the values defined for `writing-mode`, `direction`, and `text-orientation`.
   *
   * **Syntax**: `<'top'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |  n/a   | **63**  |   No   | n/a  | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inset-inline-start
   */
  insetInlineStart?: Space
  /**
   * The **`top`** CSS property participates in specifying the vertical position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/top
   */
  top?: Space
  /**
   * The **`right`** CSS property participates in specifying the horizontal position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/right
   */
  right?: Space
  /**
   * The **`bottom`** CSS property participates in specifying the vertical position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/bottom
   */
  bottom?: Space
  /**
   * The **`left`** CSS property participates in specifying the horizontal position of a _positioned element_. It has no effect on non-positioned elements.
   *
   * **Syntax**: `<length> | <percentage> | auto`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/left
   */
  left?: Space
  /**
   * The **`gap`** CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for `row-gap` and `column-gap`.
   *
   * **Syntax**: `<'grid-row-gap'> <'grid-column-gap'>?`
   *
   * @deprecated
   */
  gridGap?: Space
  /**
   * The **`grid-column-gap`** CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  gridColumnGap?: Space
  /**
   * The **`grid-row-gap`** CSS property sets the size of the gap (gutter) between an element's grid rows.
   *
   * **Syntax**: `<length-percentage>`
   *
   * **Initial value**: `0`
   *
   * @deprecated
   */
  gridRowGap?: Space
  /**
   * The **`gap`** CSS property sets the gaps (gutters) between rows and columns. It is a shorthand for `row-gap` and `column-gap`.
   *
   * **Syntax**: `<'row-gap'> <'column-gap'>?`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **63**  |   No   |  No  | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * |     Chrome      |     Firefox     |        Safari         |  Edge  | IE  |
   * | :-------------: | :-------------: | :-------------------: | :----: | :-: |
   * |     **66**      |     **61**      | **10.1** _(grid-gap)_ | **16** | No  |
   * | 57 _(grid-gap)_ | 52 _(grid-gap)_ |                       |        |     |
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **66** | **61**  |   No   | **16** | No  |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/gap
   */
  gap?: Space
  /**
   * The **`column-gap`** CSS property sets the size of the gap (gutter) between an element's columns.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox |   Safari    | Edge | IE  |
   * | :----: | :-----: | :---------: | :--: | :-: |
   * |   No   | **63**  | **3** _-x-_ |  No  | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * |     Chrome      |     Firefox     |        Safari         |  Edge  | IE  |
   * | :-------------: | :-------------: | :-------------------: | :----: | :-: |
   * |     **66**      |     **61**      | **10.1** _(grid-gap)_ | **16** | No  |
   * | 57 _(grid-gap)_ | 52 _(grid-gap)_ |                       |        |     |
   *
   * ---
   *
   * _Supported in Multi-column Layout_
   *
   * | Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :-----: | :-----: | :-----: | :----: | :----: |
   * | **50**  | **52**  | **10**  | **12** | **10** |
   * | 1 _-x-_ |         | 3 _-x-_ |        |        |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/column-gap
   */
  columnGap?: Space
  /**
   * The **`row-gap`** CSS property sets the size of the gap (gutter) between an element's grid rows.
   *
   * **Syntax**: `normal | <length-percentage>`
   *
   * **Initial value**: `normal`
   *
   * ---
   *
   * _Supported in Flex Layout_
   *
   * | Chrome | Firefox | Safari | Edge | IE  |
   * | :----: | :-----: | :----: | :--: | :-: |
   * |   No   | **63**  |   No   |  No  | No  |
   *
   * ---
   *
   * _Supported in Grid Layout_
   *
   * |       Chrome        |       Firefox       |          Safari           |  Edge  | IE  |
   * | :-----------------: | :-----------------: | :-----------------------: | :----: | :-: |
   * |       **66**        |       **61**        | **10.1** _(grid-row-gap)_ | **16** | No  |
   * | 57 _(grid-row-gap)_ | 52 _(grid-row-gap)_ |                           |        |     |
   *
   * ---
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/row-gap
   */
  rowGap?: Space
}

const sizes: Record<keyof SizesCSSProperties, 'sizes'> = {
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  blockSize: 'sizes',
  inlineSize: 'sizes',
  maxBlockSize: 'sizes',
  maxInlineSize: 'sizes',
  minBlockSize: 'sizes',
  minInlineSize: 'sizes',
}

export type Sizes = ScaleProperty<FinalTheme['sizes']>

export interface SizesCSSProperties {
  /**
   * The **`width`** CSS property sets an element's width. By default it sets the width of the content area, but if `box-sizing` is set to `border-box`, it sets the width of the border area.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   */
  width?: Sizes

  /**
   * The **`min-width`** CSS property sets the minimum width of an element. It prevents the used value of the `width` property from becoming smaller than the value specified for `min-width`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-width
   */
  minWidth?: Sizes

  /**
   * The **`max-width`** CSS property sets the maximum width of an element. It prevents the used value of the `width` property from becoming larger than the value specified by `max-width`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-width
   */
  maxWidth?: Sizes

  /**
   * The **`height`** CSS property specifies the height of an element. By default, the property defines the height of the content area. If `box-sizing` is set to `border-box`, however, it instead determines the height of the border area.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/height
   */
  height?: Sizes

  /**
   * The **`min-height`** CSS property sets the minimum height of an element. It prevents the used value of the `height` property from becoming smaller than the value specified for `min-height`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **1**  |  **3**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-height
   */
  minHeight?: Sizes

  /**
   * The **`max-height`** CSS property sets the maximum height of an element. It prevents the used value of the `height` property from becoming larger than the value specified for `max-height`.
   *
   * **Syntax**: `auto | <length> | <percentage> | min-content | max-content | fit-content(<length-percentage>)`
   *
   * **Initial value**: `none`
   *
   * | Chrome | Firefox | Safari  |  Edge  |  IE   |
   * | :----: | :-----: | :-----: | :----: | :---: |
   * | **18** |  **1**  | **1.3** | **12** | **7** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-height
   */
  maxHeight?: Sizes

  /**
   * The **`flex-basis`** CSS property sets the initial main size of a flex item. It sets the size of the content box unless otherwise set with `box-sizing`.
   *
   * **Syntax**: `content | <'width'>`
   *
   * **Initial value**: `auto`
   *
   * |  Chrome  | Firefox | Safari  |  Edge  |   IE   |
   * | :------: | :-----: | :-----: | :----: | :----: |
   * |  **29**  | **22**  |  **9**  | **12** | **11** |
   * | 22 _-x-_ |         | 7 _-x-_ |        |        |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/flex-basis
   */
  flexBasis?: Sizes

  /**
   * The **`size`** is a shorthand property for CSS properties **`width`** and **`height`**.
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/width
   * @see https://developer.mozilla.org/docs/Web/CSS/height
   */
  size?: Sizes

  /**
   * The **`block-size`** CSS property defines the horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `width` or the `height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/block-size
   */
  blockSize?: Sizes

  /**
   * The **`inline-size`** CSS property defines the horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `width` or the `height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'width'>`
   *
   * **Initial value**: `auto`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/inline-size
   */
  inlineSize?: Sizes

  /**
   * The **`min-inline-size`** CSS property defines the horizontal or vertical minimal size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-inline-size
   */
  minInlineSize?: Sizes

  /**
   * The **`max-inline-size`** CSS property defines the horizontal or vertical maximum size of an element's block depending on its writing mode. It corresponds to the `max-width` or the `max-height` property depending on the value defined for `writing-mode`. If the writing mode is vertically oriented, the value of `max-inline-size` relates to the maximal height of the element, otherwise it relates to the maximal width of the element. It relates to `max-block-size`, which defines the other dimension of the element.
   *
   * **Syntax**: `<'max-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |   Safari   |  Edge  | IE  |
   * | :----: | :-----: | :--------: | :----: | :-: |
   * | **57** | **41**  |  **12.1**  | **79** | No  |
   * |        |         | 10.1 _-x-_ |        |     |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/max-inline-size
   */
  maxInlineSize?: Sizes

  /**
   * The **`min-block-size`** CSS property defines the minimum horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-block-size
   */
  minBlockSize?: Sizes

  /**
   * The **`min-block-size`** CSS property defines the minimum horizontal or vertical size of an element's block, depending on its writing mode. It corresponds to either the `min-width` or the `min-height` property, depending on the value of `writing-mode`.
   *
   * **Syntax**: `<'min-width'>`
   *
   * **Initial value**: `0`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **57** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/min-block-size
   */
  maxBlockSize?: Sizes
}

const borders: Record<keyof BordersCSSProperties, 'borders'> = {
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderBlock: 'borders',
  borderBlockEnd: 'borders',
  borderBlockStart: 'borders',
  borderInline: 'borders',
  borderInlineEnd: 'borders',
  borderInlineStart: 'borders',
}

export type Borders = ScaleProperty<FinalTheme['borders']>

export interface BordersCSSProperties {
  /**
   * The **`border`** CSS property sets an element's border. It's a shorthand for `border-width`, `border-style`, and `border-color`.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border
   */
  border?: CSS.Property.Border<Borders>

  /**
   * The **`border-top`** CSS property is a shorthand that sets the values of `border-top-width`, `border-top-style` and `border-top-color`. These properties set an element's top border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top
   */
  borderTop?: CSS.Property.BorderTop<Borders>

  /**
   * The **`border-right`** CSS property is a shorthand that sets the values of `border-right-width`, `border-right-style` and `border-right-color`. These properties set an element's right border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |   IE    |
   * | :----: | :-----: | :----: | :----: | :-----: |
   * | **1**  |  **1**  | **1**  | **12** | **5.5** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-right
   */
  borderRight?: CSS.Property.BorderRight<Borders>

  /**
   * The **`border-bottom`** CSS property is a shorthand that sets the values of `border-bottom-width`, `border-bottom-style` and `border-bottom-color`. These properties set an element's bottom border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-bottom
   */
  borderBottom?: CSS.Property.BorderBottom<Borders>

  /**
   * The **`border-left`** CSS property is a shorthand that sets the values of `border-left-width`, `border-left-style` and `border-left-color`. These properties set an element's left border.
   *
   * **Syntax**: `<line-width> || <line-style> || <color>`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-left
   */
  borderLeft?: CSS.Property.BorderLeft<Borders>

  /**
   * The **`border-block`** CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block
   */
  borderBlock?: CSS.Property.BorderBlock<Borders>

  /**
   * The **`border-block-end`** CSS property is a shorthand property for setting the individual logical block-end border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-end
   */
  borderBlockEnd?: CSS.Property.BorderBlockEnd<Borders>

  /**
   * The **`border-block-start`** CSS property is a shorthand property for setting the individual logical block-start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-block-start
   */
  borderBlockStart?: CSS.Property.BorderBlockStart<Borders>

  /**
   * The **`border-inline`** CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox | Safari |  Edge  | IE  |
   * | :----: | :-----: | :----: | :----: | :-: |
   * | **69** | **66**  |   No   | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline
   */
  borderInline?: CSS.Property.BorderInline<Borders>

  /**
   * The **`border-inline-end`** CSS property is a shorthand property for setting the individual logical inline-end border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-end
   */
  borderInlineEnd?: CSS.Property.BorderInlineEnd<Borders>

  /**
   * The **`border-inline-start`** CSS property is a shorthand property for setting the individual logical inline-start border property values in a single place in the style sheet.
   *
   * **Syntax**: `<'border-top-width'> || <'border-top-style'> || <'color'>`
   *
   * | Chrome | Firefox |  Safari  |  Edge  | IE  |
   * | :----: | :-----: | :------: | :----: | :-: |
   * | **69** | **41**  | **12.1** | **79** | No  |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-inline-start
   */
  borderInlineStart?: CSS.Property.BorderInlineStart<Borders>
}

const radii: Record<keyof RadiiCSSProperties, 'radii'> = {
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',
}

export type Radii = ScaleProperty<FinalTheme['radii']>

export interface RadiiCSSProperties {
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
  borderRadius?: CSS.Property.BorderRadius<Radii>
  borderTopRightRadius?: CSS.Property.BorderTopRightRadius<Radii>
  borderTopLeftRadius?: CSS.Property.BorderTopLeftRadius<Radii>
  borderBottomRightRadius?: CSS.Property.BorderBottomRightRadius<Radii>
  borderBottomLeftRadius?: CSS.Property.BorderBottomLeftRadius<Radii>
  borderEndEndRadius?: CSS.Property.BorderEndEndRadius<Radii>
  borderEndStartRadius?: CSS.Property.BorderEndStartRadius<Radii>
  borderStartEndRadius?: CSS.Property.BorderStartEndRadius<Radii>
  borderStartStartRadius?: CSS.Property.BorderStartStartRadius<Radii>
}

const borderWidths: Record<keyof BorderWidthsCSSProperties, 'borderWidths'> = {
  borderWidth: 'borderWidths',
  borderTopWidth: 'borderWidths',
  borderBottomWidth: 'borderWidths',
  borderLeftWidth: 'borderWidths',
  borderRightWidth: 'borderWidths',
  borderBlockEndWidth: 'borderWidths',
  borderBlockStartWidth: 'borderWidths',
  borderBlockWidth: 'borderWidths',
  borderInlineEndWidth: 'borderWidths',
  borderInlineStartWidth: 'borderWidths',
  borderInlineWidth: 'borderWidths',
}

export type BorderWidths =
  | ScaleProperty<FinalTheme['borderWidths']>
  | CSS.Globals

export interface BorderWidthsCSSProperties {
  borderWidth?: BorderWidths
  /**
   * The **`border-top-width`** CSS property sets the width of the top border of an element.
   *
   * **Initial value**: `medium`
   *
   * | Chrome | Firefox | Safari |  Edge  |  IE   |
   * | :----: | :-----: | :----: | :----: | :---: |
   * | **1**  |  **1**  | **1**  | **12** | **4** |
   *
   * @see https://developer.mozilla.org/docs/Web/CSS/border-top-width
   */
  borderTopWidth?: BorderWidths
  borderBottomWidth?: BorderWidths
  borderLeftWidth?: BorderWidths
  borderRightWidth?: BorderWidths
  borderBlockEndWidth?: BorderWidths
  borderBlockStartWidth?: BorderWidths
  borderBlockWidth?: BorderWidths
  borderInlineEndWidth?: BorderWidths
  borderInlineStartWidth?: BorderWidths
  borderInlineWidth?: BorderWidths
}

const borderStyles: Record<keyof BorderStylesCSSProperties, 'borderStyles'> = {
  borderStyle: 'borderStyles',
  borderTopStyle: 'borderStyles',
  borderBottomStyle: 'borderStyles',
  borderLeftStyle: 'borderStyles',
  borderRightStyle: 'borderStyles',
  borderBlockEndStyle: 'borderStyles',
  borderBlockStartStyle: 'borderStyles',
  borderBlockStyle: 'borderStyles',
  borderInlineEndStyle: 'borderStyles',
  borderInlineStartStyle: 'borderStyles',
  borderInlineStyle: 'borderStyles',
}

type BorderStyles = ScaleProperty<FinalTheme['borderStyles']>

export interface BorderStylesCSSProperties {
  borderStyle?: BorderStyles | CSS.Property.BorderStyle
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

  borderTopStyle?: BorderStyles
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
  borderBottomStyle?: BorderStyles | CSS.Property.BorderBottomStyle
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
  borderLeftStyle?: BorderStyles | CSS.Property.BorderLeftStyle
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
  borderRightStyle?: BorderStyles | CSS.Property.BorderRightStyle
  borderBlockEndStyle?: BorderStyles | CSS.Property.BorderBlockEndStyle
  borderBlockStartStyle?: BorderStyles | CSS.Property.BorderBlockStartStyle
  borderBlockStyle?: BorderStyles | CSS.Property.BorderBlockStyle
  borderInlineEndStyle?: BorderStyles | CSS.Property.BorderInlineEndStyle
  borderInlineStartStyle?: BorderStyles | CSS.Property.BorderInlineStartStyle
  borderInlineStyle?: BorderStyles | CSS.Property.BorderInlineStyle
}

const fonts: Record<keyof FontsCSSProperties, 'fonts'> = {
  fontFamily: 'fonts',
}

type Fonts = ScaleProperty<FinalTheme['fonts']>

export interface FontsCSSProperties {
  fontFamily?: Fonts
}

const fontSizes: Record<keyof FontSizesCSSProperties, 'fontSizes'> = {
  fontSize: 'fontSizes',
}

// We ignore CSS.Property.FontSize, because it has too many keyword values.
// Theme UI users define their own design tokens, and autocompleting built-in
// keywords may lead to confusion.
type FontSizes = ScaleProperty<FinalTheme['fontSizes']> | CSS.Globals

export interface FontSizesCSSProperties {
  fontSize?: FontSizes
}

const fontWeights: Record<keyof FontWeightsCSSProperties, 'fontWeights'> = {
  fontWeight: 'fontWeights',
}

type FontWeights = ScaleProperty<FinalTheme['fontWeights']>

export interface FontWeightsCSSProperties {
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
  fontWeight?: FontWeights
}

const lineHeights: Record<keyof LineHeightsCSSProperties, 'lineHeights'> = {
  lineHeight: 'lineHeights',
}

type LineHeights = ScaleProperty<FinalTheme['lineHeights']> | CSS.Globals

export interface LineHeightsCSSProperties {
  lineHeight?: LineHeights
}

const letterSpacings: Record<
  keyof LetterSpacingsCSSProperties,
  'letterSpacings'
> = {
  letterSpacing: 'letterSpacings',
}

type LetterSpacings = ScaleProperty<FinalTheme['letterSpacings']>

export interface LetterSpacingsCSSProperties {
  letterSpacing?: CSS.Property.LetterSpacing<LetterSpacings>
}

const shadows: Record<keyof ShadowsCSSProperties, 'shadows'> = {
  boxShadow: 'shadows',
  textShadow: 'shadows',
}

type Shadows = ScaleProperty<FinalTheme['shadows']> | CSS.Globals | 'none'

export interface ShadowsCSSProperties {
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
  boxShadow?: Shadows
  textShadow?: Shadows
}

const zIndices: Record<keyof ZIndicesCSSProperties, 'zIndices'> = {
  zIndex: 'zIndices',
}

type ZIndices = ScaleProperty<FinalTheme['zIndices']> | 'auto'

export interface ZIndicesCSSProperties {
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
  zIndex?: ZIndices
}

export const scales = {
  ...colors,
  ...opacities,
  ...space,
  ...borders,
  ...sizes,
  ...radii,
  ...borderWidths,
  ...borderStyles,
  ...fonts,
  ...fontSizes,
  ...fontWeights,
  ...lineHeights,
  ...letterSpacings,
  ...shadows,
  ...zIndices,
} as const

export type Scales = typeof scales
