import * as CSS from 'csstype';
import { FinalTheme } from '../types';
import { ScaleProperty } from './scales-utility-types';

export const borderStyles: Record<keyof BorderStylesCSSProperties, 'borderStyles'> = {
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
};
export type BorderStyle = ScaleProperty<FinalTheme['borderStyles']>;

export interface BorderStylesCSSProperties {
  borderStyle?: BorderStyle | CSS.Property.BorderStyle;
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
  borderTopStyle?: BorderStyle;
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
  borderBottomStyle?: BorderStyle | CSS.Property.BorderBottomStyle;
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
  borderLeftStyle?: BorderStyle | CSS.Property.BorderLeftStyle;
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
  borderRightStyle?: BorderStyle | CSS.Property.BorderRightStyle;
  borderBlockEndStyle?: BorderStyle | CSS.Property.BorderBlockEndStyle;
  borderBlockStartStyle?: BorderStyle | CSS.Property.BorderBlockStartStyle;
  borderBlockStyle?: BorderStyle | CSS.Property.BorderBlockStyle;
  borderInlineEndStyle?: BorderStyle | CSS.Property.BorderInlineEndStyle;
  borderInlineStartStyle?: BorderStyle | CSS.Property.BorderInlineStartStyle;
  borderInlineStyle?: BorderStyle | CSS.Property.BorderInlineStyle;
}
