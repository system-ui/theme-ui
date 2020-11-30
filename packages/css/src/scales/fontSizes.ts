import * as CSS from 'csstype'

import { Theme } from '../types'

import { ScaleProperty } from './scales-utility-types'

export const fontSizes: Record<keyof FontSizesCSSProperties, 'fontSizes'> = {
  fontSize: 'fontSizes',
}
// We ignore CSS.Property.FontSize, because it has too many keyword values.
// Theme UI users define their own design tokens, and autocompleting built-in
// keywords may lead to confusion.

export type FontSize = ScaleProperty<Theme['fontSizes']> | CSS.Globals

export interface FontSizesCSSProperties {
  fontSize?: FontSize
}
