import pluralize from 'pluralize'

export default (theme, prefix) => {
  const customProperties = {}

  const generateProperties = (object, previousKey) => {
    Object.entries(object).forEach(([key, value]) => {
      let formattedKey = pluralize(key, 1)

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
