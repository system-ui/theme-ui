// custom implementation of typography.js for use in theme-ui
import verticalRhythm from 'compass-vertical-rhythm'
import ms from 'modularscale'
import styles from './styles'

import type { TypographyOptions } from 'typography'
import type { VerticalRhythmOptions, VerticalRhythm } from 'compass-vertical-rhythm'
import type { Merge } from 'type-fest'

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

export interface CustomTypographyOptions extends Merge<
  Required<BaseTypographyOptions>,
  ChangedTypographyOptions
> { }

export interface CustomVerticalRhythm extends VerticalRhythm {
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

// TODO: find better theme definition
interface Theme {
  space: number[]
  fonts: {
    body: string
    heading: string
  }
  fontSizes: number[]
  fontWeights: {
    body: string | number
    bold: string | number
    heading: string | number
  }
  lineHeights: {
    body: number
    heading: number
  }
  styles: typeof styles
  typography: CustomVerticalRhythm
}

export const toUnitless = parseFloat

export const getScale = (
  opts: CustomTypographyOptions
) => (value: number): number => (
  ms(value, opts.scaleRatio) * opts.baseFontSize
)

export const getSpace = (
  rhythm: VerticalRhythm,
  opts: CustomTypographyOptions
): Theme['space'] => {
  const n = toUnitless(rhythm.rhythm(opts.blockMarginBottom))
  return [0, 1 / 4, 1 / 2, 1, 2, 4, 8].map(v => v * n) as Theme['space']
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

const wrapFontFamily = (
  fontFamily: string
): string => (
  genericFontFamilies.includes(fontFamily) ? fontFamily : `'${fontFamily}'`
)

const stackFonts = (
  fonts: string[]
): string => (
  fonts.map(wrapFontFamily).join(', ')
)

export const getFonts = (
  rhythm: VerticalRhythm,
  opts: CustomTypographyOptions
): Theme['fonts'] => {
  const body = stackFonts(opts.bodyFontFamily)
  const heading = stackFonts(opts.headerFontFamily)
  return {
    body,
    heading,
  }
}

export const getFontSizes = (
  rhythm: VerticalRhythm,
  opts: CustomTypographyOptions
): Theme['fontSizes'] => {
  const scale = getScale(opts)
  return [-1.5 / 5, -1 / 5, 0, 2 / 5, 3 / 5, 1].map(scale)
}

export const getLineHeights = (
  rhythm: VerticalRhythm,
  opts: CustomTypographyOptions
): Theme['lineHeights'] => {
  const body = opts.baseLineHeight
  const heading = opts.headerLineHeight
  return {
    body,
    heading,
  }
}

export const getFontWeights = (
  rhythm: VerticalRhythm,
  opts: CustomTypographyOptions
): Theme['fontWeights'] => {
  const body = opts.bodyWeight
  const bold = opts.boldWeight
  const heading = opts.headerWeight
  return {
    body,
    bold,
    heading,
  }
}

const pruneOptionsFromUnwanted = (
  opts?: TypographyOptions
): BaseTypographyOptions | undefined => {
  if (opts == null) {
    return opts
  }

  // Fast omit
  return Object.fromEntries(
    Object.entries(opts)
    .filter(([key]) => !unwantedTypographyOptions.includes(
      key as UnwantedTypographyOptions
    ))
  ) as BaseTypographyOptions
}

const toUnitlessOptions = (
  opts?: TypographyOptions
): Partial<CustomTypographyOptions> | undefined => {
  // Return nullish opts
  // Or opts with nullish baseFontSize (intentional override)
  // Or opts with unset baseFontSize (just not defined)
  if (opts == null || opts.baseFontSize == null) {
    return opts as Partial<CustomTypographyOptions>
  }

  return {
    ...opts,
    baseFontSize: toUnitless(opts.baseFontSize)
  }
}

export const toTheme = (
  _opts?: TypographyOptions
): Theme => {
  const opts: CustomTypographyOptions = {
    ...defaults,

    // remove unwanted options
    ...toUnitlessOptions(
      // enforce unitless values
      pruneOptionsFromUnwanted(_opts)
    )
  }

  const rhythmOpts: VerticalRhythmOptions = {
    ...opts,
    rhythmUnit: 'px'
  }

  const rhythm: VerticalRhythm = verticalRhythm(rhythmOpts)

  const theme: Theme = {
    space: getSpace(rhythm, opts),
    fonts: getFonts(rhythm, opts),
    fontSizes: getFontSizes(rhythm, opts),
    fontWeights: getFontWeights(rhythm, opts),
    lineHeights: getLineHeights(rhythm, opts),
    styles,
    typography: {
      ...rhythm,
      options: opts
    }
  }

  return theme
}

export default toTheme
