import * as CSS from 'csstype';
import { FinalTheme } from '../types';
import { ScaleProperty } from './scales-utility-types';






export const lineHeights: Record<keyof LineHeightsCSSProperties, 'lineHeights'> = {
  lineHeight: 'lineHeights',
};

export type LineHeight = ScaleProperty<FinalTheme['lineHeights']> | CSS.Globals;

export interface LineHeightsCSSProperties {
  lineHeight?: LineHeight;
}
