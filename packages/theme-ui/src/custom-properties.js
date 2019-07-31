import { css } from '@styled-system/css'

// convert theme and style objects to CSS custom properties
//
// theme {
//   colors: {
//     text: 'var(--theme-ui-colors-text, #000)',
//     modes: {
//       dark: {
//         text: 'var(--theme-ui-colors-modes-dark-text, #fff)',
//       }
//     }
//   }
// }
//
// body {
//   color: theme.colors.text,
//   backgroundColor: theme.colors.text,
//
//   '--theme-ui-colors-text': '#000',
//
//   &.dark {
//     '--theme-ui-colors-text': '#fff',
//     '--theme-ui-colors-nested-value-name': '#f00',
//   }
// }

const toVarName = key => `--theme-ui-${key}`
const toVarValue = (key, value) => `var(${toVarName(key)}, ${value})`

const join = (...args) => args.filter(Boolean).join('-')

const numberScales = {
  fontWeights: true,
  lineHeights: true,
}
const toPixel = (key, value) => {
  if (typeof value !== 'number') return value
  if (numberScales[key]) return value
  return value + 'px'
}

// convert theme values to custom properties
export const toCustomProperties = (obj, parent, themeKey) => {
  const next = {}
  for (let key in obj) {
    const value = obj[key]
    const name = join(parent, key)
    if (value && typeof value === 'object') {
      next[key] = toCustomProperties(value, name, key)
      continue
    }
    const val = toPixel(themeKey || key, value)
    next[key] = toVarValue(name, val)
  }
  return next
}

export const objectToVars = (parent, obj) => {
  let vars = {}
  for (let key in obj) {
    const name = toVarName(join(parent, key))
    const value = obj[key]
    if (value && typeof value === 'object') {
      vars = {
        ...vars,
        ...objectToVars(name, value),
      }
    } else {
      vars[name] = value
    }
  }
  return vars
}

// create body styles for color modes
export const createBodyStyles = theme => {
  if (!theme.colors || !theme.colors.modes) return {}
  const { modes } = theme.colors
  const styles = {}
  Object.keys(modes).forEach(mode => {
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
