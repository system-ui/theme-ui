import type { ColorModesScale, Theme, ThemeStyles } from './types'

/**
 * Constrained identity function used to constrain user's theme type to Theme
 * while preserving its exact type.
 */
export const makeTheme = <T extends Theme>(theme: T): T => theme

/**
 * Constrained identity function used to create a styles dictionary
 * assignable to ThemeStyles while preserving its exact type.
 */
export const makeStyles = <T extends ThemeStyles>(styles: T): T => styles

export const makeColorsScale = <T extends ColorModesScale>(colors: T) => colors
