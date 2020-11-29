import type { FinalTheme } from '../types'

import type { ScaleProperty } from './scales-utility-types'
import type { Globals } from './css-common'

import type { Color } from './colors'

// We can't use types from csstype, because Color union is huge, what's
// both "unstrict" and bad for performance
export type Border<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderBlock<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderBlockColor = Globals | Color | (string & {})

export type BorderBlockEnd<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderBlockEndColor = Globals | Color

export type BorderBlockEndStyle = Globals | DataType.LineStyle

export type BorderBlockEndWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderBlockStart<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderBlockStartColor = Globals | Color

export type BorderBlockStartStyle = Globals | DataType.LineStyle

export type BorderBlockStartWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderBlockStyle = Globals | DataType.LineStyle

export type BorderBlockWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderBottom<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderBottomColor = Globals | Color

export type BorderBottomLeftRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderBottomRightRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderBottomStyle = Globals | DataType.LineStyle

export type BorderBottomWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderCollapse = Globals | 'collapse' | 'separate'

export type BorderColor = Globals | Color | (string & {})

export type BorderEndEndRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderEndStartRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderImage =
  | Globals
  | 'none'
  | 'repeat'
  | 'round'
  | 'space'
  | 'stretch'
  | (string & {})
  | (number & {})

export type BorderImageOutset<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})
  | (number & {})

export type BorderImageRepeat =
  | Globals
  | 'repeat'
  | 'round'
  | 'space'
  | 'stretch'
  | (string & {})

export type BorderImageSlice = Globals | (string & {}) | (number & {})

export type BorderImageSource = Globals | 'none' | (string & {})

export type BorderImageWidth<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | 'auto'
  | (string & {})
  | (number & {})

export type BorderInline<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderInlineColor = Globals | Color | (string & {})

export type BorderInlineEnd<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderInlineEndColor = Globals | Color

export type BorderInlineEndStyle = Globals | DataType.LineStyle

export type BorderInlineEndWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderInlineStart<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderInlineStartColor = Globals | Color

export type BorderInlineStartStyle = Globals | DataType.LineStyle

export type BorderInlineStartWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderInlineStyle = Globals | DataType.LineStyle

export type BorderInlineWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderLeft<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderLeftColor = Globals | Color

export type BorderLeftStyle = Globals | DataType.LineStyle

export type BorderLeftWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderRight<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderRightColor = Globals | Color

export type BorderRightStyle = Globals | DataType.LineStyle

export type BorderRightWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderSpacing<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderStartEndRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderStartStartRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderStyle = Globals | DataType.LineStyle | (string & {})

export type BorderTop<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | DataType.LineStyle
  | Color
  | (string & {})

export type BorderTopColor = Globals | Color

export type BorderTopLeftRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderTopRightRadius<TLength = (string & {}) | 0> =
  | Globals
  | TLength
  | (string & {})

export type BorderTopStyle = Globals | DataType.LineStyle

export type BorderTopWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>

export type BorderWidth<TLength = (string & {}) | 0> =
  | Globals
  | DataType.LineWidth<TLength>
  | (string & {})

export const borders: Record<keyof BordersCSSProperties, 'borders'> = {
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
