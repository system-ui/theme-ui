// custom implementation of typography.js for use in theme-ui
import verticalRhythm from 'compass-vertical-rhythm'
import { Theme, Scale, ThemeStyles } from '@theme-ui/css'
import ms from 'modularscale'
import CSS from 'csstype'
import { TypographyOptions } from 'typography'
import { Merge } from 'type-fest'

import styles from './styles'

declare module '@theme-ui/css' {
  interface Theme {
    typography?: ThemeTypographyRhythm
  }
}

const unwantedTypographyOptions = [
  'headerColor',
  'bodyColor',
  'overrideStyles',
  'overrideThemeStyles',
  'plugins',
] as const
type UnwantedTypographyOptions = typeof unwantedTypographyOptions[number]

type BaseTypographyOptions = Omit<TypographyOptions, UnwantedTypographyOptions>

interface ChangedTypographyOptions {
  baseFontSize: number
}

export interface CustomTypographyOptions
  extends Merge<Required<BaseTypographyOptions>, ChangedTypographyOptions> {}

export interface ThemeTypographyRhythm extends verticalRhythm.VerticalRhythm {
  options: CustomTypographyOptions
}

// - uses unitless values
// - creates base theme object
// - uses a static theme.styles object for consumption in theme-ui
// - ignores overrideThemeStyles
// - does not include color styles
// - should be mostly compatible with existing typography.js themes

const defaults: CustomTypographyOptions = {
  baseFontSize: 16,
  baseLineHeight: 1.45,
  headerLineHeight: 1.1,
  scaleRatio: 2,
  googleFonts: [],
  headerFontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ],
  bodyFontFamily: ['georgia', 'serif'],
  headerWeight: 'bold',
  bodyWeight: 'normal',
  boldWeight: 'bold',
  includeNormalize: true,
  blockMarginBottom: 1,
}

export const toUnitless = parseFloat

export const getScale = (opts: CustomTypographyOptions) => (
  value: number
): number => ms(value, opts.scaleRatio) * opts.baseFontSize

export type ThemeSpace = number[]
export const getSpace = (
  rhythm: verticalRhythm.VerticalRhythm,
  opts: CustomTypographyOptions
): ThemeSpace => {
  const n = toUnitless(rhythm.rhythm(opts.blockMarginBottom) as any)
  return [0, 1 / 4, 1 / 2, 1, 2, 4, 8].map((v) => v * n)
}

// genericFontFamilies, wrapFontFamily adapted from typography.js
// Wrap font names in quotes, unless the font name is actually a keyword.
// See https://stackoverflow.com/a/13752149 and https://www.w3.org/TR/CSS2/fonts.html#font-family-prop
const genericFontFamilies = [
  'inherit',
  'default',
  'serif',
  'sans-serif',
  'monospace',
  'fantasy',
  'cursive',
  '-apple-system',
  'system-ui',
]

const wrapFontFamily = (fontFamily: string): string =>
  genericFontFamilies.includes(fontFamily) ? fontFamily : `'${fontFamily}'`

const stackFonts = (fonts: string[]): string =>
  fonts.map(wrapFontFamily).join(', ')

export type ThemeFonts = Scale<CSS.Property.FontFamily> & {
  body: CSS.Property.FontFamily
  heading: CSS.Property.FontFamily
}

export const getFonts = (
  rhythm: verticalRhythm.VerticalRhythm,
  opts: CustomTypographyOptions
): ThemeFonts => {
  const body = stackFonts(opts.bodyFontFamily)
  const heading = stackFonts(opts.headerFontFamily)
  return {
    body,
    heading,
  }
}

export type ThemeFontSizes = number[]
export const getFontSizes = (
  rhythm: verticalRhythm.VerticalRhythm,
  opts: CustomTypographyOptions
): ThemeFontSizes => {
  const scale = getScale(opts)
  return [-1.5 / 5, -1 / 5, 0, 2 / 5, 3 / 5, 1].map(scale)
}

export type ThemeLineHeights = Scale<
  CSS.Property.LineHeight<string | number>
> & {
  body: CSS.Property.LineHeight<string | number>
  heading: CSS.Property.LineHeight<string | number>
}
export const getLineHeights = (
  rhythm: verticalRhythm.VerticalRhythm,
  opts: CustomTypographyOptions
): ThemeLineHeights => {
  const body = opts.baseLineHeight
  const heading = opts.headerLineHeight
  return {
    body,
    heading,
  }
}

export type ThemeFontWeights = Scale<CSS.Property.FontWeight> & {
  body: CSS.Property.FontWeight
  bold: CSS.Property.FontWeight
  heading: CSS.Property.FontWeight
}
export const getFontWeights = (
  rhythm: verticalRhythm.VerticalRhythm,
  opts: CustomTypographyOptions
): ThemeFontWeights => {
  return {
    body: opts.bodyWeight as CSS.Property.FontWeight,
    bold: opts.boldWeight as CSS.Property.FontWeight,
    heading: opts.headerWeight as CSS.Property.FontWeight,
  }
}

const pruneOptionsFromUnwanted = (
  opts?: TypographyOptions
): BaseTypographyOptions | undefined => {
  if (opts == null) {
    return opts
  }

  const res = { ...opts }
  for (const k of unwantedTypographyOptions) {
    delete res[k]
  }
  return res as BaseTypographyOptions
}

const toUnitlessOptions = (
  opts?: TypographyOptions
): Partial<CustomTypographyOptions> | undefined => {
  // Return nullish opts
  // Or opts with nullish baseFontSize (intentional override)
  // Or opts with unset baseFontSize (just not defined)
  if (opts == null || opts.baseFontSize == null) {
    return (opts as unknown) as Partial<CustomTypographyOptions>
  }

  return {
    ...opts,
    baseFontSize: toUnitless(opts.baseFontSize),
  }
}

// We can say more about the theme received from `toTheme` than about
// unknown generic theme.
interface ThemeConvertedFromTypographyConfig extends Theme {
  space: ThemeSpace
  fonts: ThemeFonts
  fontSizes: ThemeFontSizes
  fontWeights: ThemeFontWeights
  lineHeights: ThemeLineHeights
  styles: ThemeStyles
  typography: ThemeTypographyRhythm
}
export const toTheme = (
  options?: TypographyOptions
): ThemeConvertedFromTypographyConfig => {
  const opts: CustomTypographyOptions = {
    ...defaults,

    // remove unwanted options
    ...toUnitlessOptions(
      // enforce unitless values
      pruneOptionsFromUnwanted(options)
    ),
  }

  const rhythmOpts: verticalRhythm.Options = {
    ...opts,
    rhythmUnit: 'px',
    baseFontSize: String(opts.baseFontSize),
  }

  const rhythm: verticalRhythm.VerticalRhythm = verticalRhythm(rhythmOpts)

  return {
    space: getSpace(rhythm, opts),
    fonts: getFonts(rhythm, opts),
    fontSizes: getFontSizes(rhythm, opts),
    fontWeights: getFontWeights(rhythm, opts),
    lineHeights: getLineHeights(rhythm, opts),
    styles,
    typography: {
      ...rhythm,
      options: opts,
    },
  }
}

export default toTheme
