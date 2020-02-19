import * as P from 'polished'
import { get, Theme } from '@theme-ui/css'

const g = (t: Theme, c: string) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '')

/**
 * Darken a color by an amount 0–1
 */
export const darken = (c: string, n: number) => (t: Theme) =>
  P.darken(n, g(t, c))
/**
 * Lighten a color by an amount 0–1
 */
export const lighten = (c: string, n: number) => (t: Theme) =>
  P.lighten(n, g(t, c))
/**
 * Rotate the hue of a color by an amount 0–360
 */
export const rotate = (c: string, d: number) => (t: Theme) =>
  P.adjustHue(d, g(t, c))

/**
 * Set the hue of a color to a degree 0–360
 */
export const hue = (c: string, h: number) => (t: Theme) => P.setHue(h, g(t, c))
/**
 * Set the saturation of a color to an amount 0–1
 */
export const saturation = (c: string, s: number) => (t: Theme) =>
  P.setSaturation(s, g(t, c))
/**
 * Set the lightness of a color to an amount 0–1
 */
export const lightness = (c: string, l: number) => (t: Theme) =>
  P.setLightness(l, g(t, c))
/**
 * Desaturate a color by an amount 0–1
 */
export const desaturate = (c: string, n: number) => (t: Theme) =>
  P.desaturate(n, g(t, c))
/**
 * Saturate a color by an amount 0–1
 */
export const saturate = (c: string, n: number) => (t: Theme) =>
  P.saturate(n, g(t, c))

/**
 * Shade a color by an amount 0–1
 */
export const shade = (c: string, n: number) => (t: Theme) => P.shade(n, g(t, c))
/**
 * Tint a color by an amount 0–1
 */
export const tint = (c: string, n: number) => (t: Theme) => P.tint(n, g(t, c))

export const transparentize = (c: string, n: number) => (t: Theme) =>
  P.transparentize(n, g(t, c))
/**
 * Set the transparency of a color to an amount 0-1
 */
export const alpha = (c: string, n: number) => (t: Theme) => P.rgba(g(t, c), n)

/**
 * Mix two colors by a specific ratio
 */
export const mix = (a: string, b: string, n = 0.5) => (t: Theme) =>
  P.mix(n, g(t, a), g(t, b))

/**
 * Get the complement of a color
 */
export const complement = (c: string) => (t: Theme) => P.complement(g(t, c))

/**
 * Get the inverted color
 */
export const invert = (c: string) => (t: Theme) => P.invert(g(t, c))

/**
 * Desaturate the color to grayscale
 */
export const grayscale = (c: string) => desaturate(c, 1)
