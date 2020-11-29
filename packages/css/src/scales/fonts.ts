import { FinalTheme } from '../types'
import { ScaleProperty } from './scales-utility-types'

export const fonts: Record<keyof FontsCSSProperties, 'fonts'> = {
  fontFamily: 'fonts',
}
export type Font = ScaleProperty<FinalTheme['fonts']>

export interface FontsCSSProperties {
  fontFamily?: Font
}
