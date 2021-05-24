import type { Property } from 'csstype'

import type { Theme } from '../types'

import type { ScaleProperty } from './scales-utility-types'

export const letterSpacings: Record<
  keyof LetterSpacingsCSSProperties,
  'letterSpacings'
> = {
  letterSpacing: 'letterSpacings',
}

export type LetterSpacing = ScaleProperty<Theme['letterSpacings']>

export interface LetterSpacingsCSSProperties {
  letterSpacing?: Property.LetterSpacing<LetterSpacing>
}
