import * as CSS from 'csstype'

import { Theme } from '../types'

import { ScaleProperty } from './scales-utility-types'

export const transitions: Record<
  keyof TransitionsCSSProperties,
  'transitions'
> = {
  transition: 'transitions',
}

export type Transition = ScaleProperty<Theme['transitions']> | CSS.Globals

export interface TransitionsCSSProperties {
  transition?: Transition
}
