import { FinalTheme } from '../types';
import { ScaleProperty } from './scales-utility-types';







export const zIndices: Record<keyof ZIndicesCSSProperties, 'zIndices'> = {
  zIndex: 'zIndices',
};

export type ZIndices = ScaleProperty<FinalTheme['zIndices']> | 'auto';

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
  zIndex?: ZIndices;
}
