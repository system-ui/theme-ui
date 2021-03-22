import pluralize from 'pluralize'
import { Theme } from '@theme-ui/css'

interface CustomProperties {
  [key: string]: string | number
}

export default (theme: Theme, prefix?: string) => {
  const customProperties: CustomProperties = {}

  const generateProperties = (object: object, previousKey?: string) => {
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
