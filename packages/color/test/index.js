import {
  darken,
  lighten,
  rotate,
  hue,
  saturation,
  lightness,
  desaturate,
  saturate,
  shade,
  tint,
  transparentize,
  alpha,
  mix,
  complement,
  invert,
  grayscale,
} from '../src'

const theme = {
  colors: {
    primary: '#0cf',
    secondary: '#639',
  },
}

test('desaturate', () => {
  const n = desaturate('primary', 0.5)(theme)
  expect(n).toBe('#40a6bf')
})

test('saturate', () => {
  const n = saturate('secondary', 1)(theme)
  expect(n).toBe('#60c')
})

test('darken', () => {
  const n = darken('primary', 0.25)(theme)
  expect(n).toBe('#006680')
})

test('lighten', () => {
  const n = lighten('primary', 0.25)(theme)
  expect(n).toBe('#80e5ff')
})

test('rotate', () => {
  const n = rotate('primary', 30)(theme)
  expect(n).toBe('#004cff')
})

test('hue', () => {
  const n = hue('primary', 200)(theme)
  expect(n).toBe('#0af')
})

test('saturation', () => {
  const n = saturation('primary', 0.25)(theme)
  expect(n).toBe('#60939f')
})

test('lightness', () => {
  const n = lightness('primary', 0.25)(theme)
  expect(n).toBe('#006680')
})

test('shade', () => {
  const n = shade('primary', 0.25)(theme)
  expect(n).toBe('#0099bf')
})

test('tint', () => {
  const n = tint('primary', 0.25)(theme)
  expect(n).toBe('#3fd8ff')
})

test('transparentize', () => {
  const n = transparentize('primary', 0.25)(theme)
  expect(n).toBe('rgba(0,204,255,0.75)')
})

test('alpha', () => {
  const n = alpha('primary', 0.25)(theme)
  expect(n).toBe('rgba(0,204,255,0.25)')
})

test('mix', () => {
  const n = mix('primary', 'secondary', 0.25)(theme)
  expect(n).toBe('#4c59b2')
})

test('mix without third argument', () => {
  const n = mix('primary', 'secondary')(theme)
  expect(n).toBe('#337fcc')
})

test('complement', () => {
  const n = complement('secondary')(theme)
  expect(n).toBe('#693')
})

test('invert', () => {
  const n = invert('primary')(theme)
  expect(n).toBe('#f30')
})

test('grayscale', () => {
  const n = grayscale('primary')(theme)
  expect(n).toBe('#808080')
})

const themeCustomProps = {
  colors: {
    primary: 'var(--theme-ui-colors-primary, #0cf)',
    secondary: 'var(--theme-ui-colors-primary, #639)',
  },
}

test('desaturateCustomProps', () => {
  const n = desaturate('primary', 0.5)(themeCustomProps)
  expect(n).toBe('#40a6bf')
})

test('saturateCustomProps', () => {
  const n = saturate('secondary', 1)(themeCustomProps)
  expect(n).toBe('#60c')
})

test('darkenCustomProps', () => {
  const n = darken('primary', 0.25)(themeCustomProps)
  expect(n).toBe('#006680')
})

test('lightenCustomProps', () => {
  const n = lighten('primary', 0.25)(themeCustomProps)
  expect(n).toBe('#80e5ff')
})

test('rotateCustomProps', () => {
  const n = rotate('primary', 30)(themeCustomProps)
  expect(n).toBe('#004cff')
})

test('hueCustomProps', () => {
  const n = hue('primary', 200)(themeCustomProps)
  expect(n).toBe('#0af')
})

test('saturationCustomProps', () => {
  const n = saturation('primary', 0.25)(themeCustomProps)
  expect(n).toBe('#60939f')
})

test('lightnessCustomProps', () => {
  const n = lightness('primary', 0.25)(themeCustomProps)
  expect(n).toBe('#006680')
})

test('shadeCustomProps', () => {
  const n = shade('primary', 0.25)(themeCustomProps)
  expect(n).toBe('#0099bf')
})

test('tintCustomProps', () => {
  const n = tint('primary', 0.25)(themeCustomProps)
  expect(n).toBe('#3fd8ff')
})

test('alphaCustomProps', () => {
  const n = alpha('primary', 0.25)(themeCustomProps)
  expect(n).toBe('rgba(0,204,255,0.25)')
})

test('mixCustomProps', () => {
  const n = mix('primary', 'secondary', 0.25)(themeCustomProps)
  expect(n).toBe('#4c59b2')
})

test('complementCustomProps', () => {
  const n = complement('secondary')(themeCustomProps)
  expect(n).toBe('#693')
})

test('invertCustomProps', () => {
  const n = invert('primary')(themeCustomProps)
  expect(n).toBe('#f30')
})

test('grayscaleCustomProps', () => {
  const n = grayscale('primary')(themeCustomProps)
  expect(n).toBe('#808080')
})

const themeTomato = {
  colors: {
    primary: 'tomato',
  },
}

test('darkenTomato', () => {
  const n = darken('primary', 0.25)(themeTomato)
  expect(n).toBe('#c61e00')
})

const themeTomatoCustomProps = {
  colors: {
    primary: 'var(--theme-ui-colors-primary, tomato)',
  },
}

test('darkenTomatoCustomProps', () => {
  const n = darken('primary', 0.25)(themeTomatoCustomProps)
  expect(n).toBe('#c61e00')
})
