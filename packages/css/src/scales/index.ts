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
import { transitions } from './transitions'
import { zIndices } from './zIndices'

import type {
  BordersCSSProperties,
  Border as BorderScaleValue,
} from './borders'
import type {
  BorderStylesCSSProperties,
  BorderStyle as BorderStyleScaleValue,
} from './borderStyles'
import type {
  BorderWidthsCSSProperties,
  BorderWidth as BorderWidthScaleValue,
} from './borderWidths'
import type {
  ColorScaleCSSProperties,
  Color as ColorScaleValue,
} from './colors'
import type { FontsCSSProperties, Font as FontScaleValue } from './fonts'
import type {
  FontSizesCSSProperties,
  FontSize as FontSizeScaleValue,
} from './fontSizes'
import type {
  FontWeightsCSSProperties,
  FontWeight as FontWeightScaleValue,
} from './fontWeights'
import type {
  LetterSpacingsCSSProperties,
  LetterSpacing as LetterSpacingScaleValue,
} from './letterSpacings'
import type {
  LineHeightsCSSProperties,
  LineHeight as LineHeightScaleValue,
} from './lineHeights'
import type {
  OpacitiesCSSProperties,
  Opacity as OpacityScaleValue,
} from './opacities'
import type { RadiiCSSProperties, Radius as RadiusScaleValue } from './radii'
import type {
  ShadowsCSSProperties,
  Shadow as ShadowScaleValue,
} from './shadows'
import type { SizesCSSProperties, Size as SizeScaleValue } from './sizes'
import type { SpaceCSSProperties, Space as SpaceScaleValue } from './space'
import type {
  TransitionsCSSProperties,
  Transition as TransitionsScaleValue,
} from './transitions'
import type {
  ZIndicesCSSProperties,
  ZIndex as ZIndexScaleValue,
} from './zIndices'

export declare namespace Scales {
  export type Border = BorderScaleValue
  export type BorderStyle = BorderStyleScaleValue
  export type BorderWidth = BorderWidthScaleValue
  export type Color = ColorScaleValue
  export type Font = FontScaleValue
  export type FontSize = FontSizeScaleValue
  export type FontWeight = FontWeightScaleValue
  export type LetterSpacing = LetterSpacingScaleValue
  export type LineHeight = LineHeightScaleValue
  export type Opacity = OpacityScaleValue
  export type Radius = RadiusScaleValue
  export type Shadow = ShadowScaleValue
  export type Size = SizeScaleValue
  export type Space = SpaceScaleValue
  export type Transition = TransitionsScaleValue
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
  ...transitions,
  ...zIndices,
} as const

export type Scales = typeof scales

export interface ScalesCSSProperties
  extends ColorScaleCSSProperties,
    OpacitiesCSSProperties,
    SpaceCSSProperties,
    BordersCSSProperties,
    SizesCSSProperties,
    RadiiCSSProperties,
    BorderWidthsCSSProperties,
    BorderStylesCSSProperties,
    FontsCSSProperties,
    FontSizesCSSProperties,
    FontWeightsCSSProperties,
    LineHeightsCSSProperties,
    LetterSpacingsCSSProperties,
    ShadowsCSSProperties,
    ZIndicesCSSProperties {}
