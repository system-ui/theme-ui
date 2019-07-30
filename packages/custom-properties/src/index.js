import pluralize from 'pluralize'

const formatKey = key => {
  return pluralize(key, 1)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
}

export default (theme, prefix) => {
  const customProperties = {}

  const generateProperties = (object, previousKey) => {
    Object.entries(object).forEach(([key, value]) => {
      let formattedKey = formatKey(key)

      if (prefix && !previousKey) {
        formattedKey = `${prefix}-${formattedKey}`
      }

      const newKey = previousKey
        ? previousKey + '-' + formattedKey
        : formattedKey

      if (Array.isArray(value)) {
        value.forEach((item, i) => {
          customProperties[`--${newKey}-${i}`] = item
        })
      } else if (Object(value) === value) {
        generateProperties(value, newKey)
      } else {
        customProperties[`--${newKey}`] = value
      }
    })
  }

  generateProperties(theme)

  return customProperties
}
