import {
  CSSObject,
  ThemeUIStyleObject,
  ThemeDerivedStyles,
  Theme,
  ThemeUICSSObject,
  FinalTheme,
} from './types'
import { scales, Scales } from './scales'

export { scales } from './scales';
export type { Scales } from './scales'
export * from './types'

export function get(
  obj: object,
  key: string | number | undefined,
  def?: unknown,
  p?: number,
  undef?: unknown
): any {
  const path = key && typeof key === 'string' ? key.split('.') : [key]
  for (p = 0; p < path.length; p++) {
    obj = obj ? (obj as any)[path[p]!] : undef
  }
  return obj === undef ? def : obj
}

export const defaultBreakpoints = [40, 52, 64].map((n) => n + 'em')

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
}

const aliases = {
  bg: 'backgroundColor',
  m: 'margin',
  mt: 'marginTop',
  mr: 'marginRight',
  mb: 'marginBottom',
  ml: 'marginLeft',
  mx: 'marginX',
  my: 'marginY',
  p: 'padding',
  pt: 'paddingTop',
  pr: 'paddingRight',
  pb: 'paddingBottom',
  pl: 'paddingLeft',
  px: 'paddingX',
  py: 'paddingY',
} as const
type Aliases = typeof aliases

export const multiples = {
  marginX: ['marginLeft', 'marginRight'],
  marginY: ['marginTop', 'marginBottom'],
  paddingX: ['paddingLeft', 'paddingRight'],
  paddingY: ['paddingTop', 'paddingBottom'],
  scrollPaddingX: ['scrollPaddingLeft', 'scrollPaddingRight'],
  scrollPaddingY: ['scrollPaddingTop', 'scrollPaddingBottom'],
  size: ['width', 'height'],
}

const positiveOrNegative = (scale: object, value: string | number) => {
  if (typeof value !== 'number' || value >= 0) {
    if (typeof value === 'string' && value.startsWith('-')) {
      const valueWithoutMinus = value.substring(1)
      const n = get(scale, valueWithoutMinus, valueWithoutMinus)
      return `-${n}`
    }
    return get(scale, value, value)
  }
  const absolute = Math.abs(value)
  const n = get(scale, absolute, absolute)
  if (typeof n === 'string') return '-' + n
  return Number(n) * -1
}

const transforms = [
  'margin',
  'marginTop',
  'marginRight',
  'marginBottom',
  'marginLeft',
  'marginX',
  'marginY',
  'marginBlock',
  'marginBlockEnd',
  'marginBlockStart',
  'marginInline',
  'marginInlineEnd',
  'marginInlineStart',
  'top',
  'bottom',
  'left',
  'right',
].reduce(
  (acc, curr) => ({
    ...acc,
    [curr]: positiveOrNegative,
  }),
  {}
)

const responsive = (
  styles: Exclude<ThemeUIStyleObject, ThemeDerivedStyles>
) => (theme: FinalTheme) => {
  const next: Exclude<ThemeUIStyleObject, ThemeDerivedStyles> = {}
  const breakpoints =
    (theme && (theme.breakpoints as string[])) || defaultBreakpoints
  const mediaQueries = [
    null,
    ...breakpoints.map((n) => `@media screen and (min-width: ${n})`),
  ]

  for (const k in styles) {
    const key = k as keyof typeof styles
    let value = styles[key]
    if (typeof value === 'function') {
      value = value(theme)
    }

    if (value == null) continue
    if (!Array.isArray(value)) {
      next[key] = value
      continue
    }
    for (let i = 0; i < value.slice(0, mediaQueries.length).length; i++) {
      const media = mediaQueries[i]
      if (!media) {
        next[key] = value[i]
        continue
      }
      next[media] = next[media] || {}
      if (value[i] == null) continue;
      (next[media] as Record<string, any>)[key] = value[i]
    }
  }
  return next
}

type CssPropsArgument = { theme?: FinalTheme } | FinalTheme

export const css = (args: ThemeUIStyleObject = {}) => (
  props: CssPropsArgument = {}
): CSSObject => {
  const theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  } as FinalTheme
  let result: CSSObject = {}
  let obj = typeof args === 'function' ? args(theme) : args
  // insert variant props before responsive styles, so they can be merged
  if (obj['variant']) {
    // Type instantiation is excessively deep and possibly infinite.ts(2589)
    obj = { ...get(theme, obj['variant']), ...obj }
    delete obj['variant'];
  }
  const styles = responsive(obj)(theme)

  for (const key in styles) {
    const x = styles[key as keyof typeof styles]
    const val = typeof x === 'function' ? x(theme) : x

    if (val && typeof val === 'object') {
      // TODO: val can also be an array here. Is this a bug? Can it be reproduced?
      result[key] = css(val as ThemeUICSSObject)(theme)
      continue
    }

    const prop = key in aliases ? aliases[key as keyof Aliases] : key
    const scaleName = prop in scales ? scales[prop as keyof Scales] : undefined
    const scale = get(theme, scaleName as any, get(theme, prop, {}))
    const transform: any = get(transforms, prop, get)
    const value = transform(scale, val, val)

    if (prop in multiples) {
      const dirs = multiples[prop as keyof typeof multiples]

      for (let i = 0; i < dirs.length; i++) {
        result[dirs[i]] = value
      }
    } else {
      result[prop] = value
    }
  }

  return result
}
