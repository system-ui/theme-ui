import pluralize from 'pluralize'
import { Theme } from '@theme-ui/css'

// Simplified validator based on spec https://www.w3.org/TR/CSS22/syndata.html#value-def-identifier
// Does not check for "cannot start with a digit, two hyphens, or a hyphen followed by a digit"
const keyValidator = /^[A-z0-9][\w-]*$/

interface CustomProperties {
  [key: string]: string | number
}

export default function makeCustomProperties(theme: Theme, prefix?: string) {
  const customProperties: CustomProperties = {}

  const generateProperties = (object: object, previousKey?: string) => {
    Object.entries(object).forEach(([key, value]) => {
      let formattedKey = pluralize(key, 1) || key

      if (
        process.env.NODE_ENV !== 'production' &&
        !keyValidator.test(formattedKey)
      ) {
        console.warn(
          `[theme-ui] Theme key "${value}" found will produce an invalid CSS custom property. ` +
            'Keys must only contain the following: A-Z, a-z, 0-9, hyphen, underscore.'
        )
      }

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
