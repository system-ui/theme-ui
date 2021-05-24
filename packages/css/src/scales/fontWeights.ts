import { Theme } from '../types'

import { ScaleProperty } from './scales-utility-types'

export const fontWeights: Record<
  keyof FontWeightsCSSProperties,
  'fontWeights'
> = {
  fontWeight: 'fontWeights',
}

export type FontWeight = ScaleProperty<Theme['fontWeights']>

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
  fontWeight?: FontWeight
}
