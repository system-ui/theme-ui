import {
  CSSObject,
  ThemeUIStyleObject,
  ThemeDerivedStyles,
  Theme,
  ThemeUICSSObject,
} from './types'

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

export const scales = {
  color: 'colors',
  backgroundColor: 'colors',
  borderColor: 'colors',
  caretColor: 'colors',
  columnRuleColor: 'colors',
  opacity: 'opacities',
  transition: 'transitions',
  margin: 'space',
  marginTop: 'space',
  marginRight: 'space',
  marginBottom: 'space',
  marginLeft: 'space',
  marginX: 'space',
  marginY: 'space',
  marginBlock: 'space',
  marginBlockEnd: 'space',
  marginBlockStart: 'space',
  marginInline: 'space',
  marginInlineEnd: 'space',
  marginInlineStart: 'space',
  padding: 'space',
  paddingTop: 'space',
  paddingRight: 'space',
  paddingBottom: 'space',
  paddingLeft: 'space',
  paddingX: 'space',
  paddingY: 'space',
  paddingBlock: 'space',
  paddingBlockEnd: 'space',
  paddingBlockStart: 'space',
  paddingInline: 'space',
  paddingInlineEnd: 'space',
  paddingInlineStart: 'space',
  scrollPadding: 'space',
  scrollPaddingTop: 'space',
  scrollPaddingRight: 'space',
  scrollPaddingBottom: 'space',
  scrollPaddingLeft: 'space',
  scrollPaddingX: 'space',
  scrollPaddingY: 'space',
  inset: 'space',
  insetBlock: 'space',
  insetBlockEnd: 'space',
  insetBlockStart: 'space',
  insetInline: 'space',
  insetInlineEnd: 'space',
  insetInlineStart: 'space',
  top: 'space',
  right: 'space',
  bottom: 'space',
  left: 'space',
  gridGap: 'space',
  gridColumnGap: 'space',
  gridRowGap: 'space',
  gap: 'space',
  columnGap: 'space',
  rowGap: 'space',
  fontFamily: 'fonts',
  fontSize: 'fontSizes',
  fontWeight: 'fontWeights',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacings',
  border: 'borders',
  borderTop: 'borders',
  borderRight: 'borders',
  borderBottom: 'borders',
  borderLeft: 'borders',
  borderWidth: 'borderWidths',
  borderStyle: 'borderStyles',
  borderRadius: 'radii',
  borderTopRightRadius: 'radii',
  borderTopLeftRadius: 'radii',
  borderBottomRightRadius: 'radii',
  borderBottomLeftRadius: 'radii',
  borderTopWidth: 'borderWidths',
  borderTopColor: 'colors',
  borderTopStyle: 'borderStyles',
  borderBottomWidth: 'borderWidths',
  borderBottomColor: 'colors',
  borderBottomStyle: 'borderStyles',
  borderLeftWidth: 'borderWidths',
  borderLeftColor: 'colors',
  borderLeftStyle: 'borderStyles',
  borderRightWidth: 'borderWidths',
  borderRightColor: 'colors',
  borderRightStyle: 'borderStyles',
  borderBlock: 'borders',
  borderBlockEnd: 'borders',
  borderBlockEndStyle: 'borderStyles',
  borderBlockEndWidth: 'borderWidths',
  borderBlockStart: 'borders',
  borderBlockStartStyle: 'borderStyles',
  borderBlockStartWidth: 'borderWidths',
  borderBlockStyle: 'borderStyles',
  borderBlockWidth: 'borderWidths',
  borderEndEndRadius: 'radii',
  borderEndStartRadius: 'radii',
  borderInline: 'borders',
  borderInlineEnd: 'borders',
  borderInlineEndStyle: 'borderStyles',
  borderInlineEndWidth: 'borderWidths',
  borderInlineStart: 'borders',
  borderInlineStartStyle: 'borderStyles',
  borderInlineStartWidth: 'borderWidths',
  borderInlineStyle: 'borderStyles',
  borderInlineWidth: 'borderWidths',
  borderStartEndRadius: 'radii',
  borderStartStartRadius: 'radii',
  outlineColor: 'colors',
  boxShadow: 'shadows',
  textShadow: 'shadows',
  zIndex: 'zIndices',
  width: 'sizes',
  minWidth: 'sizes',
  maxWidth: 'sizes',
  height: 'sizes',
  minHeight: 'sizes',
  maxHeight: 'sizes',
  flexBasis: 'sizes',
  size: 'sizes',
  blockSize: 'sizes',
  inlineSize: 'sizes',
  maxBlockSize: 'sizes',
  maxInlineSize: 'sizes',
  minBlockSize: 'sizes',
  minInlineSize: 'sizes',
  // svg
  fill: 'colors',
  stroke: 'colors',
} as const
type Scales = typeof scales

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
) => (theme?: Theme) => {
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
      value = value(theme || {})
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
      if (value[i] == null) continue
      ;(next[media] as Record<string, any>)[key] = value[i]
    }
  }

  return next
}

type CssPropsArgument = { theme: Theme } | Theme

export const css = (args: ThemeUIStyleObject = {}) => (
  props: CssPropsArgument = {}
): CSSObject => {
  const theme: Theme = {
    ...defaultTheme,
    ...('theme' in props ? props.theme : props),
  }
  let result: CSSObject = {}
  const obj = typeof args === 'function' ? args(theme) : args
  const styles = responsive(obj)(theme)

  for (const key in styles) {
    const x = styles[key as keyof typeof styles]
    const val = typeof x === 'function' ? x(theme) : x

    if (key === 'variant') {
      const variant = css(get(theme, val as string))(theme)
      result = { ...result, ...variant }
      continue
    }

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
