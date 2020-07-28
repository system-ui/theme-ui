import { css, Theme, ColorModesScale, ColorMode } from '@theme-ui/css'

const toVarName = (key: string) => `--theme-ui-${key}`
const toVarValue = (key: string, value: unknown) =>
  `var(${toVarName(key)}, ${value})`

const join = (...args: any[]) => args.filter(Boolean).join('-')

const numberScales = {
  fontWeights: true,
  lineHeights: true,
}
const reservedKeys = {
  useCustomProperties: true,
  initialColorModeName: true,
  initialColorMode: true,
  useLocalStorage: true,
}

const toPixel = (key: keyof typeof numberScales, value: string | number) => {
  if (typeof value !== 'number') return value
  if (numberScales[key]) return value
  return value + 'px'
}

// convert theme values to custom properties
export const toCustomProperties = (
  obj: any,
  parent?: any,
  themeKey?: string
) => {
  const next: any = Array.isArray(obj)
    ? ([] as ColorMode[])
    : ({} as ColorModesScale)

  for (let key in obj) {
    const value = obj[key]
    const name = join(parent, key)
    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name, key)
      continue
    }
    if ((reservedKeys as any)[key]) {
      next[key] = value
      continue
    }
    const val = toPixel(themeKey || (key as any), value)
    next[key] = toVarValue(name, val)
  }

  return next
}

// todo
export const objectToVars = (parent: unknown, obj: Record<string, any>) => {
  let vars: Record<string, any> = {}
  for (let key in obj) {
    if (key === 'modes') continue
    const name = join(parent, key)
    const value = obj[key]
    if (value && typeof value === 'object') {
      vars = {
        ...vars,
        ...objectToVars(name, value),
      }
    } else {
      vars[toVarName(name)] = value
    }
  }
  return vars
}

// create body styles for color modes
export const createColorStyles = (theme: Theme = {}) => {
  if (!theme.colors || theme.useBodyStyles === false) return {}
  if (theme.useCustomProperties === false || !theme.colors.modes) {
    return css({
      body: {
        color: 'text',
        bg: 'background',
      },
    })(theme)
  }
  const colors = theme.rawColors || theme.colors
  const modes = colors.modes || {}
  const styles = objectToVars('colors', colors)

  Object.keys(modes).forEach((mode) => {
    const key = `&.theme-ui-${mode}`
    styles[key] = objectToVars('colors', modes[mode])
  })

  return css({
    body: {
      ...styles,
      color: 'text',
      bg: 'background',
    },
  })(theme)
}
