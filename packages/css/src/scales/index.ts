import { borderStyles } from './borderStyles'
import { borderWidths } from './borderWidths'
import { fonts } from './fonts'
import { fontSizes } from './fontSizes'
import { fontWeights } from './fontWeights'
import { letterSpacings } from './letterSpacings'
import { lineHeights } from './lineHeights'
import { radii } from './radii'
import { shadows } from './shadows'
import { zIndices } from './zIndices'
import { colors } from './colors'
import { borders } from './borders'
import { sizes } from './sizes'
import { space } from './space'
import { opacities } from './opacities'

export type { BorderStylesCSSProperties, BorderStyle } from './borderStyles'
export type { BorderWidthsCSSProperties, BorderWidth } from './borderWidths'
export type { FontsCSSProperties, Font } from './fonts'
export type { FontSizesCSSProperties, FontSize } from './fontSizes'
// TODO
export type {} from './fontWeights'
export type {} from './letterSpacings'
export type {} from './lineHeights'
export type {} from './radii'
export type {} from './shadows'
export type {} from './zIndices'
export type {} from './colors'
export type {} from './borders'
export type {} from './sizes'
export type {} from './space'
export type {} from './opacities'

export const scales = {
  ...colors,
  ...opacities,
  ...space,
  ...borders,
  ...sizes,
  ...radii,
  ...borderWidths,
  ...borderStyles,
  ...fonts,
  ...fontSizes,
  ...fontWeights,
  ...lineHeights,
  ...letterSpacings,
  ...shadows,
  ...zIndices,
} as const

export type Scales = typeof scales
