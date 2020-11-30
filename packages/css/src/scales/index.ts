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
export type { FontWeightsCSSProperties, FontWeight } from './fontWeights'
export type {
  LetterSpacingsCSSProperties,
  LetterSpacing,
} from './letterSpacings'
export type { LineHeightsCSSProperties, LineHeight } from './lineHeights'
export type { RadiiCSSProperties, Radius } from './radii'
export type { ShadowsCSSProperties, Shadow } from './shadows'
export type { ZIndicesCSSProperties, ZIndex } from './zIndices'
export type { ColorScaleCSSProperties, Color } from './colors'
export type { BordersCSSProperties, Border } from './borders'
export type { SizesCSSProperties, Size } from './sizes'
export type { SpaceCSSProperties, Space } from './space'
export type { OpacitiesCSSProperties, Opacity } from './opacities'

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
