import { Theme } from '../types'

import { Globals } from './css-common'
import { ScaleProperty } from './scales-utility-types'

export const borderWidths: Record<
  keyof BorderWidthsCSSProperties,
  'borderWidths'
> = {
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

export type BorderWidth = ScaleProperty<Theme['borderWidths']>

export interface BorderWidthsCSSProperties {
  borderWidth?: BorderWidth | Globals
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
  borderTopWidth?: BorderWidth | Globals
  borderBottomWidth?: BorderWidth | Globals
  borderLeftWidth?: BorderWidth | Globals
  borderRightWidth?: BorderWidth | Globals
  borderBlockEndWidth?: BorderWidth | Globals
  borderBlockStartWidth?: BorderWidth | Globals
  borderBlockWidth?: BorderWidth | Globals
  borderInlineEndWidth?: BorderWidth | Globals
  borderInlineStartWidth?: BorderWidth | Globals
  borderInlineWidth?: BorderWidth | Globals
}
