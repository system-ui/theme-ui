import * as CSS from 'csstype'
import { FinalTheme } from '../types'
import { ScaleProperty } from './scales-utility-types'

export const radii: Record<keyof RadiiCSSProperties, 'radii'> = {
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

export type Radius = ScaleProperty<FinalTheme['radii']>

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
  borderRadius?: CSS.Property.BorderRadius<Radius>
  borderTopRightRadius?: CSS.Property.BorderTopRightRadius<Radius>
  borderTopLeftRadius?: CSS.Property.BorderTopLeftRadius<Radius>
  borderBottomRightRadius?: CSS.Property.BorderBottomRightRadius<Radius>
  borderBottomLeftRadius?: CSS.Property.BorderBottomLeftRadius<Radius>
  borderEndEndRadius?: CSS.Property.BorderEndEndRadius<Radius>
  borderEndStartRadius?: CSS.Property.BorderEndStartRadius<Radius>
  borderStartEndRadius?: CSS.Property.BorderStartEndRadius<Radius>
  borderStartStartRadius?: CSS.Property.BorderStartStartRadius<Radius>
}
