import { FinalTheme } from '../types'

import { ScaleProperty } from './scales-utility-types'

export const opacities: Record<keyof OpacitiesCSSProperties, 'opacities'> = {
  opacity: 'opacities',
}

export type Opacity = ScaleProperty<FinalTheme['opacities']>

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
  opacity?: Opacity
}
