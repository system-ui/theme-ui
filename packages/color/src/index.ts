import * as P from 'polished'
import { ColorModesScale, get, Theme } from '@theme-ui/css'

type Color = ColorModesScale[string]

/**
 * Get color from theme.colors
 */
export const getColor = (theme: Theme, color: Color) => {
  if (typeof color === 'object') {
    color = Array.isArray(color)
      ? color[0]
      : (color as Exclude<typeof color, string & {}>).__default
  }

  if (process.env.NODE_ENV !== 'production') {
    if (color && /^var\(--theme-ui-colors-(.+)\)$/.test(color)) {
      throw new Error(
        'A CSS property was passed to `getColor`. ' +
          '`theme.colors` contains CSS custom properties. ' +
          'Use `theme.rawColors` instead.'
      )
    }
  }

  return get(
    theme,
    'rawColors' in theme ? `rawColors.${color}` : `colors.${color}`,
    color
  )
}

/**
 * Darken a color by an amount 0–1
 */
export const darken = (c: Color, n: number) => (t: Theme) =>
  P.darken(n, getColor(t, c))
/**
 * Lighten a color by an amount 0–1
 */
export const lighten = (c: Color, n: number) => (t: Theme) =>
  P.lighten(n, getColor(t, c))
/**
 * Rotate the hue of a color by an amount 0–360
 */
export const rotate = (c: Color, d: number) => (t: Theme) =>
  P.adjustHue(d, getColor(t, c))

/**
 * Set the hue of a color to a degree 0–360
 */
export const hue = (c: Color, h: number) => (t: Theme) =>
  P.setHue(h, getColor(t, c))
/**
 * Set the saturation of a color to an amount 0–1
 */
export const saturation = (c: Color, s: number) => (t: Theme) =>
  P.setSaturation(s, getColor(t, c))
/**
 * Set the lightness of a color to an amount 0–1
 */
export const lightness = (c: Color, l: number) => (t: Theme) =>
  P.setLightness(l, getColor(t, c))
/**
 * Desaturate a color by an amount 0–1
 */
export const desaturate = (c: Color, n: number) => (t: Theme) =>
  P.desaturate(n, getColor(t, c))
/**
 * Saturate a color by an amount 0–1
 */
export const saturate = (c: Color, n: number) => (t: Theme) =>
  P.saturate(n, getColor(t, c))

/**
 * Shade a color by an amount 0–1
 */
export const shade = (c: Color, n: number) => (t: Theme) =>
  P.shade(n, getColor(t, c))
/**
 * Tint a color by an amount 0–1
 */
export const tint = (c: Color, n: number) => (t: Theme) =>
  P.tint(n, getColor(t, c))

export const transparentize = (c: Color, n: number) => (t: Theme) =>
  P.transparentize(n, getColor(t, c))
/**
 * Set the transparency of a color to an amount 0-1
 */
export const alpha = (c: Color, n: number) => (t: Theme) =>
  P.rgba(getColor(t, c), n)

/**
 * Mix two colors by a specific ratio
 */
export const mix =
  (a: Color, b: Color, n = 0.5) =>
  (t: Theme) =>
    P.mix(n, getColor(t, a), getColor(t, b))

/**
 * Get the complement of a color
 */
export const complement = (c: Color) => (t: Theme) =>
  P.complement(getColor(t, c))

/**
 * Get the inverted color
 */
export const invert = (c: Color) => (t: Theme) => P.invert(getColor(t, c))

/**
 * Desaturate the color to grayscale
 */
export const grayscale = (c: Color) => desaturate(c, 1)
