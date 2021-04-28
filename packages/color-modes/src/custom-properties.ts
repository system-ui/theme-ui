import { css, Theme } from '@theme-ui/css'

const toVarName = (key: string) => `--theme-ui-${key.replace('-__default', '')}`
const toVarValue = (key: string) => `var(${toVarName(key)})`

const join = (...args: (string | undefined)[]) => args.filter(Boolean).join('-')

const numberScales = {
  fontWeights: true,
  lineHeights: true,
}
const reservedKeys = {
  useCustomProperties: true,
  initialColorModeName: true,
  printColorModeName: true,
  initialColorMode: true,
  useLocalStorage: true,
}

const toPixel = (key: string, value: string | number) => {
  if (typeof value !== 'number') return value
  if (numberScales[key as keyof typeof numberScales]) return value
  return value + 'px'
}

// convert theme values to custom properties
export const toCustomProperties = (
  obj: Record<string, any> | undefined,
  parent?: string,
  themeKey?: string
) => {
  const next: Record<string, any> = Array.isArray(obj) ? [] : {}

  for (let key in obj) {
    const value = obj[key]
    const name = join(parent, key)
    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name, key)
      continue
    }
    if (reservedKeys[key as keyof typeof reservedKeys]) {
      next[key] = value
      continue
    }
    const val = toPixel(themeKey || key, value)
    next[key] = toVarValue(name)
  }

  return next
}

export const objectToVars = (parent: string, obj: Record<string, any>) => {
  let vars: Record<string, object> = {}
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

// create root styles for color modes
export const createColorStyles = (theme: Theme = {}) => {
  const {
    useCustomProperties,
    initialColorModeName,
    printColorModeName,
    useRootStyles,
  } = theme.config || theme || {}
  const colors = theme.rawColors || theme.colors

  if (!colors || useRootStyles === false) return {}
  if (useCustomProperties === false) {
    return css({
      html: {
        color: 'text',
        bg: 'background',
      },
    })(theme)
  }

  const modes = colors.modes || {}
  const styles = objectToVars('colors', colors)
  Object.keys(modes).forEach((mode) => {
    const key = `&.theme-ui-${mode}`
    styles[key] = objectToVars('colors', modes[mode])
  })

  if (printColorModeName) {
    const mode =
      printColorModeName === 'initial' ||
      printColorModeName === initialColorModeName
        ? colors
        : modes[printColorModeName]
    styles['@media print'] = objectToVars('colors', mode)
  }
  const colorToVarValue = (color: string) => toVarValue(`colors-${color}`)

  return css({
    html: {
      ...styles,
      color: colorToVarValue('text'),
      bg: colorToVarValue('background'),
    },
  })(theme)
}
