import * as CSS from 'csstype'
import { FinalTheme } from '../types'
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

export type BorderWidth =
  | ScaleProperty<FinalTheme['borderWidths']>
  | CSS.Globals

export interface BorderWidthsCSSProperties {
  borderWidth?: BorderWidth
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
  borderTopWidth?: BorderWidth
  borderBottomWidth?: BorderWidth
  borderLeftWidth?: BorderWidth
  borderRightWidth?: BorderWidth
  borderBlockEndWidth?: BorderWidth
  borderBlockStartWidth?: BorderWidth
  borderBlockWidth?: BorderWidth
  borderInlineEndWidth?: BorderWidth
  borderInlineStartWidth?: BorderWidth
  borderInlineWidth?: BorderWidth
}
