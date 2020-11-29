import * as CSS from 'csstype';
import { FinalTheme } from '../types';
import { ScaleProperty } from './scales-utility-types';






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
};

export type Radii = ScaleProperty<FinalTheme['radii']>;

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
  borderRadius?: CSS.Property.BorderRadius<Radii>;
  borderTopRightRadius?: CSS.Property.BorderTopRightRadius<Radii>;
  borderTopLeftRadius?: CSS.Property.BorderTopLeftRadius<Radii>;
  borderBottomRightRadius?: CSS.Property.BorderBottomRightRadius<Radii>;
  borderBottomLeftRadius?: CSS.Property.BorderBottomLeftRadius<Radii>;
  borderEndEndRadius?: CSS.Property.BorderEndEndRadius<Radii>;
  borderEndStartRadius?: CSS.Property.BorderEndStartRadius<Radii>;
  borderStartEndRadius?: CSS.Property.BorderStartEndRadius<Radii>;
  borderStartStartRadius?: CSS.Property.BorderStartStartRadius<Radii>;
}
