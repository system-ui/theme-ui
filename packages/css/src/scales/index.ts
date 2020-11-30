import { borders } from './borders'
import { borderStyles } from './borderStyles'
import { borderWidths } from './borderWidths'
import { colors } from './colors'
import { fonts } from './fonts'
import { fontSizes } from './fontSizes'
import { fontWeights } from './fontWeights'
import { letterSpacings } from './letterSpacings'
import { lineHeights } from './lineHeights'
import { opacities } from './opacities'
import { radii } from './radii'
import { shadows } from './shadows'
import { sizes } from './sizes'
import { space } from './space'
import { zIndices } from './zIndices'

export type { BordersCSSProperties } from './borders'
export type { BorderStylesCSSProperties } from './borderStyles'
export type { BorderWidthsCSSProperties } from './borderWidths'
export type { ColorScaleCSSProperties } from './colors'
export type { FontsCSSProperties } from './fonts'
export type { FontSizesCSSProperties } from './fontSizes'
export type { FontWeightsCSSProperties } from './fontWeights'
export type { LetterSpacingsCSSProperties } from './letterSpacings'
export type { LineHeightsCSSProperties } from './lineHeights'
export type { OpacitiesCSSProperties } from './opacities'
export type { RadiiCSSProperties } from './radii'
export type { ShadowsCSSProperties } from './shadows'
export type { SizesCSSProperties } from './sizes'
export type { SpaceCSSProperties } from './space'
export type { ZIndicesCSSProperties } from './zIndices'

import type { Border as BorderScaleValue } from './borders'
import type { BorderStyle as BorderStyleScaleValue } from './borderStyles'
import type { BorderWidth as BorderWidthScaleValue } from './borderWidths'
import type { Color as ColorScaleValue } from './colors'
import type { Font as FontScaleValue } from './fonts'
import type { FontSize as FontSizeScaleValue } from './fontSizes'
import type { LineHeight as LineHeightScaleValue } from './lineHeights'
import type { Opacity as OpacityScaleValue } from './opacities'
import type { Radius as RadiusScaleValue } from './radii'
import type { Shadow as ShadowScaleValue } from './shadows'
import type { Size as SizeScaleValue } from './sizes'
import type { Space as SpaceScaleValue } from './space'
import type { ZIndex as ZIndexScaleValue } from './zIndices'

export declare namespace Scales {
  export type Border = BorderScaleValue
  export type BorderStyle = BorderStyleScaleValue
  export type BorderWidth = BorderWidthScaleValue
  export type Color = ColorScaleValue
  export type Font = FontScaleValue
  export type FontSize = FontSizeScaleValue
  export type LineHeight = LineHeightScaleValue
  export type Opacity = OpacityScaleValue
  export type Radius = RadiusScaleValue
  export type Shadow = ShadowScaleValue
  export type Size = SizeScaleValue
  export type Space = SpaceScaleValue
  export type ZIndex = ZIndexScaleValue
}

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

