import {
  CSSObject,
  ThemeUIStyleObject,
  ThemeUICSSObject,
  Theme,
  ResponsiveStyleTuple,
  DerivedStylePropertyValue,
  ObjectWithDefault,
} from './types'
import { scales, Scales } from './scales'
import { multiples } from './multiples'
import { Aliases, aliases } from './aliases'

export { scales } from './scales'
export type { Scales } from './scales'

export * from './types'
export * from './exact-theme'
export { __internalGetUseRootStyles } from './options'

/**
 * Allows for nested scales with shorthand values
 * @example
 * {
 *   colors: {
 *     primary: { __default: '#00f', light: '#33f' }
 *   }
 * }
 * css({ color: 'primary' }); // { color: '#00f' }
 * css({ color: 'primary.light' }) // { color: '#33f' }
 */
export const THEME_UI_DEFAULT_KEY: keyof ObjectWithDefault<never> = '__default'

const hasDefault = (x: unknown): x is ObjectWithDefault<unknown> => {
  return typeof x === 'object' && x !== null && THEME_UI_DEFAULT_KEY in x
}

/**
 * Extracts value under path from a deeply nested object.
 * Used for Themes, variants and Theme UI style objects.
 * Given a path to object with `__default` key, returns the value under that key.
 *
 * @param obj a theme, variant or style object
 * @param path path separated with dots (`.`)
 * @param fallback default value returned if get(obj, path) is not found
 */
export function get(
  obj: object,
  path: string | number | undefined,
  fallback?: unknown,
  p?: number,
  undef?: unknown
): any {
  const pathArray = path && typeof path === 'string' ? path.split('.') : [path]
  for (p = 0; p < pathArray.length; p++) {
    obj = obj ? (obj as any)[pathArray[p]!] : undef
  }

  if (obj === undef) return fallback

  return hasDefault(obj) ? obj[THEME_UI_DEFAULT_KEY] : obj
}

export const getObjectWithVariants = (
  obj: ThemeUICSSObject,
  theme: Theme
): ThemeUICSSObject => {
  if (obj && obj['variant']) {
    let result: ThemeUICSSObject = {}
    for (const key in obj) {
      const x = obj[key]
      if (key === 'variant') {
        const val = typeof x === 'function' ? x(theme) : x
        const variant = getObjectWithVariants(get(theme, val as string), theme)
        result = { ...result, ...variant }
      } else {
        result[key] = x
      }
    }
    return result
  }
  return obj
}

export const defaultBreakpoints = [40, 52, 64].map((n) => n + 'em')

const defaultTheme = {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
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

type StyleObjectWithoutTuples = {
  [P in keyof ThemeUICSSObject]:
    | Exclude<
        ThemeUICSSObject[P],
        ResponsiveStyleTuple<any> | DerivedStylePropertyValue<any>
      >
    | ((theme: Theme) => string | number | null | false)
}

/**
 * transform functions (satyles derived from theme) into their values
 * and transforms responsive style tuples into media queries
 */
function responsive(
  styles: ThemeUICSSObject,
  theme: Theme
): StyleObjectWithoutTuples {
  const next: StyleObjectWithoutTuples = {}
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

    if (value === false || value == null) {
      continue
    }
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
      if (value[i] == null) continue
      ;(next[media] as Record<string, any>)[key] = value[i]
    }
  }
  return next
}

type CssPropsArgument = { theme?: Theme } | Theme

export const css = (args: ThemeUIStyleObject = {}) => (
  props: CssPropsArgument = {}
): CSSObject => {
  const theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  } as Theme
  // insert variant props before responsive styles, so they can be merged
  // we need to maintain order of the style props, so if a variant is place in the middle
  // of other props, it will extends its props at that same location order.

  const obj = getObjectWithVariants(
    typeof args === 'function' ? args(theme) : args,
    theme
  )

  const styles = responsive(obj, theme)
  let result: CSSObject = {}

  for (const key in styles) {
    const x = styles[key as keyof typeof styles]

    if (x === false || x == null) {
      continue
    }

    const val = typeof x === 'function' ? x(theme) : x

    if (val && typeof val === 'object') {
      if (hasDefault(val)) {
        result[key] = val[THEME_UI_DEFAULT_KEY]
      } else {
        result[key] = css(val)(theme)
      }

      continue
    }

    const prop = key in aliases ? aliases[key as keyof Aliases] : key
    const scaleName = prop in scales ? scales[prop as keyof Scales] : undefined
    const scale = scaleName ? theme?.[scaleName] : get(theme, prop, {})
    const transform = get(transforms, prop, get)
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
