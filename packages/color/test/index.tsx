/**
 * @jest-environment jsdom
 */

import { Theme, ThemeUICSSObject } from '@theme-ui/css'
import { ThemeUIProvider } from '@theme-ui/theme-provider'
import { render } from '@theme-ui/test-utils'
import { matchers } from '@emotion/jest'

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
  getColor,
} from '../src'

expect.extend(matchers)

const theme = {
  colors: {
    primary: '#0cf',
    secondary: '#639',
  },
} as Theme

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
    primary: 'var(--theme-ui-colors-primary)',
    secondary: 'var(--theme-ui-colors-primary)',
  },
  rawColors: {
    primary: '#0cf',
    secondary: '#639',
  },
} as Theme

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

const themeTomato: Theme = {
  colors: {
    primary: 'tomato',
  },
}

test('darkenTomato', () => {
  const n = darken('primary', 0.25)(themeTomato)
  expect(n).toBe('#c61e00')
})

const themeTomatoCustomProps: Theme = {
  colors: {
    primary: 'var(--theme-ui-colors-primary)',
  },
  rawColors: {
    primary: 'tomato',
  },
}

test('darkenTomatoCustomProps', () => {
  const n = darken('primary', 0.25)(themeTomatoCustomProps)
  expect(n).toBe('#c61e00')
})

const themeRgba: Theme = {
  colors: {
    primary: 'rgba(255, 0, 0, .5)',
  },
}

test('alphaRgba', () => {
  const n = alpha('primary', 0.25)(themeRgba)
  expect(n).toBe('rgba(255,0,0,0.25)')
})

const themeRgbaCustomProps: Theme = {
  colors: {
    primary: 'var(--theme-ui-colors-primary)',
  },
  rawColors: {
    primary: 'rgba(255, 0, 0, .5)',
  },
}

test('alphaRgbaCustomProps', () => {
  const n = alpha('primary', 0.25)(themeRgbaCustomProps)
  expect(n).toBe('rgba(255,0,0,0.25)')
})

describe('colors inside ThemeUIProvider', () => {
  test('__default color is darkened', () => {
    const tree = render(
      <ThemeUIProvider
        theme={{
          colors: {
            primary: {
              __default: 'deepskyblue',
              light: 'skyblue',
            },
          },
        }}
      >
        <button sx={{ color: darken('primary', 0.1) }}>Click me</button>
      </ThemeUIProvider>
    )

    expect(tree.getByRole('button')).toHaveStyleRule('color', '#09c')
  })

  test('derived color is saturated', () => {
    const theme = {
      colors: {
        secondary: {
          __default: 'deepskyblue',
          light: 'skyblue',
        },
      },
    }

    type MyTheme = typeof theme & { rawColors: typeof theme.colors }

    const tree = render(
      <ThemeUIProvider theme={theme}>
        <button
          sx={{
            color: (theme) => {
              // When read from Emotion theme, colors are CSS custom properties.
              return saturate(
                (theme as MyTheme).rawColors.secondary.light,
                0.1
              )(theme)
            },
          }}
        >
          Click me
        </button>
      </ThemeUIProvider>
    )

    expect(tree.getByRole('button')).toHaveStyleRule('color', '#80d1f2')
  })

  test('derived __default color is lightened', () => {
    const theme = {
      colors: {
        blue: {
          __default: '#00f',
          dark: '#00c',
        },
      },
    }

    type MyTheme = typeof theme & { rawColors: typeof theme.colors }

    const tree = render(
      <ThemeUIProvider theme={theme}>
        <button
          sx={{
            color: (theme) => lighten(theme.rawColors?.blue, 0.1)(theme),
          }}
        >
          Click me
        </button>
        <p
          sx={{
            color: (theme) =>
              lighten((theme as MyTheme).rawColors.blue.__default, 0.1)(theme),
          }}
        >
          Hello
        </p>
      </ThemeUIProvider>
    )

    expect(tree.getByRole('button')).toHaveStyleRule('color', '#33f')
    expect(tree.getByText('Hello')).toHaveStyleRule('color', '#33f')
  })
})

test('typechecks', () => {
  const _a: ThemeUICSSObject = {
    color: darken('primary', 0.1),
  }

  //#region past bugs
  const _b: ThemeUICSSObject = {
    'h1, h2, h3, h4, h5, h6': {
      '.remark-autolink-headers__anchor': {
        opacity: 0,
        borderRadius: '50%',
        transition: 'all 150ms linear',
        ':focus, :hover': {
          backgroundColor: alpha('primary', 0.07),
        },
      },
      ':focus, :hover': {
        '.remark-autolink-headers__anchor': {
          opacity: 1,
        },
      },
    },
  }
  //#endregion
})

describe('getColor', () => {
  test('throws error if given CSS custom property', () => {
    expect(() => getColor({}, 'var(--theme-ui-colors-primary)')).toThrow(
      'A CSS property was passed to `getColor`.'
    )
  })
})
