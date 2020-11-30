import { Theme } from '../types'

import { Globals } from './css-common'
import { ScaleProperty } from './scales-utility-types'

export const fonts: Record<keyof FontsCSSProperties, 'fonts'> = {
  fontFamily: 'fonts',
}
export type Font = ScaleProperty<Theme['fonts']>

export interface FontsCSSProperties {
  fontFamily?: Font | Globals
}
