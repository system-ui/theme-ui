import type { Property } from 'csstype'
import type { Globals } from './css-common'

import type { FinalTheme } from '../types'

import type { ScaleProperty } from './scales-utility-types'

export const letterSpacings: Record<
  keyof LetterSpacingsCSSProperties,
  'letterSpacings'
> = {
  letterSpacing: 'letterSpacings',
}

export type LetterSpacings = ScaleProperty<FinalTheme['letterSpacings']>

export interface LetterSpacingsCSSProperties {
  letterSpacing?: Property.LetterSpacing<LetterSpacings>
}
