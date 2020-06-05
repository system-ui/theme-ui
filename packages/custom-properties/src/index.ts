import React, { useEffect, useRef } from 'react'
import pluralize from 'pluralize'
import { Theme } from '@theme-ui/css'
import { ThemeProviderProps, useThemeUI, ThemeProvider } from '@theme-ui/core'

interface CustomProperties {
  [key: string]: string | number
}

export default function toCustomProperties(theme: Theme, prefix?: string) {
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

export function withCustomProperties(
  prefix?: string,
  className: string = 'theme-ui-provider'
) {
  return function customThemeProvider(props: ThemeProviderProps) {
    const ref = useRef<HTMLDivElement>(null)
    const outerTheme = useThemeUI().theme

    useEffect(() => {
      if (!ref.current) {
        return
      }

      const theme = typeof props.theme === 'function'
          ? props.theme(outerTheme)
          : props.theme
      const cssProperties = toCustomProperties(theme, prefix)

      Object.entries(cssProperties).forEach(([key, value]) => {
        ref.current!.style.setProperty(key, value.toString())
      })
    })

    return React.createElement(
      'div',
      {
        ref,
        className,
      },
      React.createElement(ThemeProvider, props)
    )
  }
}
