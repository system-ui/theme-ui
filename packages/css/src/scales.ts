import * as CSS from 'csstype'

import { FinalTheme } from './types'

const colors = {
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
} as const

export type Color =
  | Exclude<keyof Exclude<FinalTheme['colors'], undefined>, 'modes'>
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

  /**
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
  // TODO add comment
  fill?: Color
  // TODO add comment
  stroke?: Color
}

const opacities = {
  opacity: 'opacities',
} as const


// by excluding Array<any>, we remove Array's "push", "pop" methods, etc.
type Opacities = 
| Exclude<keyof Exclude<FinalTheme['opacities'], undefined>, keyof Array<any>>
| CSS.Globals

export interface OpacitiesCSSProperties {
  // TODO add comment
  opacity?: Opacities
}

const space = {
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
} as const

type Space = 
| Exclude<keyof Exclude<FinalTheme['space'], undefined>, keyof Array<any>>
| CSS.Globals

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
  margin?: Space,
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
  marginTop?: Space,
  marginRight?: Space,
  marginBottom?: Space,
  marginLeft?: Space,
  marginX?: Space,
  marginY?: Space,
  marginBlock?: Space,
  marginBlockEnd?: Space,
  marginBlockStart?: Space,
  marginInline?: Space,
  marginInlineEnd?: Space,
  marginInlineStart?: Space,
  padding?: Space,
  paddingTop?: Space,
  paddingRight?: Space,
  paddingBottom?: Space,
  paddingLeft?: Space,
  paddingX?: Space,
  paddingY?: Space,
  paddingBlock?: Space,
  paddingBlockEnd?: Space,
  paddingBlockStart?: Space,
  paddingInline?: Space,
  paddingInlineEnd?: Space,
  paddingInlineStart?: Space,
  inset?: Space,
  insetBlock?: Space,
  insetBlockEnd?: Space,
  insetBlockStart?: Space,
  insetInline?: Space,
  insetInlineEnd?: Space,
  insetInlineStart?: Space,
  top?: Space,
  right?: Space,
  bottom?: Space,
  left?: Space,
  gridGap?: Space,
  gridColumnGap?: Space,
  gridRowGap?: Space,
  gap?: Space,
  columnGap?: Space,
  rowGap?: Space,
}


const sizes = {
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
} as const

type Sizes = 
| Exclude<keyof Exclude<FinalTheme['sizes'], undefined>, keyof Array<any>>
| CSS.Globals

export interface SizesCSSProperties {
  width?: Sizes
  minWidth?: Sizes
  maxWidth?: Sizes
  height?: Sizes
  minHeight?: Sizes
  maxHeight?: Sizes
  flexBasis?: Sizes
  size?: Sizes
  blockSize?: Sizes
  inlineSize?: Sizes
  maxBlockSize?: Sizes
  maxInlineSize?: Sizes
  minBlockSize?: Sizes
  minInlineSize?: Sizes
}

const borders = {
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
} as const

type Borders = 
| Exclude<keyof Exclude<FinalTheme['borders'], undefined>, keyof Array<any>>
| CSS.Globals

export interface BordersCSSProperties {
  border?: Borders
  borderTop?: Borders
  borderRight?: Borders
  borderBottom?: Borders
  borderLeft?: Borders
}

export const scales = {
  ...colors,
  ...opacities,
  ...space,
  ...borders,
  ...sizes,
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightStyle: 'borderStyles',
  borderBlock: 'borders',
  borderBlockEnd: 'borders',
  borderBlockEndStyle: 'borderStyles',
  borderBlockEndWidth: 'borderWidths',
  borderBlockStart: 'borders',
  borderBlockStartStyle: 'borderStyles',
  borderBlockStartWidth: 'borderWidths',
  borderBlockStyle: 'borderStyles',
  borderBlockWidth: 'borderWidths',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderInline: 'borders',
  borderInlineEnd: 'borders',
  borderInlineEndStyle: 'borderStyles',
  borderInlineEndWidth: 'borderWidths',
  borderInlineStart: 'borders',
  borderInlineStartStyle: 'borderStyles',
  borderInlineStartWidth: 'borderWidths',
  borderInlineStyle: 'borderStyles',
  borderInlineWidth: 'borderWidths',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
} as const

export type Scales = typeof scales
