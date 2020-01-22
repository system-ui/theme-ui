import * as P from 'polished'
import { get } from '@theme-ui/css'

const g = (t, c) =>
  get(t, `colors.${c}`, c)
    .replace(/^var\(--(\w+)(.*?), /, '')
    .replace(/\)/, '')

export const darken = (c, n) => t => P.darken(n, g(t, c))
export const lighten = (c, n) => t => P.lighten(n, g(t, c))
export const rotate = (c, d) => t => P.adjustHue(d, g(t, c))

export const hue = (c, h) => t => P.setHue(h, g(t, c))
export const saturation = (c, s) => t => P.setSaturation(s, g(t, c))
export const lightness = (c, l) => t => P.setLightness(l, g(t, c))

export const desaturate = (c, n) => t => P.desaturate(n, g(t, c))
export const saturate = (c, n) => t => P.saturate(n, g(t, c))

export const shade = (c, n) => t => P.shade(n, g(t, c))
export const tint = (c, n) => t => P.tint(n, g(t, c))

export const transparentize = (c, n) => t => P.transparentize(n, g(t, c))
export const alpha = (c, n) => t => P.rgba(g(t, c), n)

export const mix = (a, b, n = 0.5) => t => P.mix(n, g(t, a), g(t, b))

export const complement = c => t => P.complement(g(t, c))
export const invert = c => t => P.invert(g(t, c))

export const grayscale = (c, n) => desaturate(c, 1)
