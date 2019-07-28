const camelCaseToKebabCase = variableName =>
  variableName.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()

const stringToCssVariable = (variableName, prefix) =>
  prefix
    ? `--${prefix}-${variableName}`.toLowerCase()
    : `--${variableName}`.toLowerCase()

export default (theme, prefix) => {
  const cssVariables = {}

  Object.entries(theme).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        const variableName = stringToCssVariable(`${key}-${i}`, prefix)
        cssVariables[variableName] = item
      })
    } else if (value === Object(value)) {
      Object.entries(value).forEach(([childKey, childValue]) => {
        const variableName = stringToCssVariable(
          `${key}-${camelCaseToKebabCase(childKey)}`,
          prefix
        )
        cssVariables[variableName] = childValue
      })
    } else {
      cssVariables[key] = value
    }
  })

  return Object.entries(cssVariables)
    .map(([key, value]) => {
      return `${key}: ${value};`
    })
    .join('\n')
}
