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

test('mix', () => {
  const n = mix('primary', 'secondary', 0.25)(theme)
  expect(n).toBe('#4c59b2')
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
