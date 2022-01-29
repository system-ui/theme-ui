/* istanbul ignore file */

import { Theme } from '@theme-ui/css'

const KEY_MAPPING: {
  readonly [Key: string]: string | string[]
} = {
  space: 'spacing',
  fonts: 'fontFamily',
  borderStyles: 'borderStyle',
  radii: 'borderRadius',
  shadows: 'boxShadow',
  fontSizes: 'typeScale',
  fontWeights: 'fontWeight',
  lineHeights: 'lineHeight',
  letterSpacings: 'letterSpacing',
  size: ['heights', 'maxHeights', 'widths', 'maxWidths'],
  zIndices: 'zIndex',
}

/**
 * @deprecated
 *
 * This package is no longer maintained as its dependencies (postcss-rtl) are
 * not maintained. Feel free to copy the code to your project — it's just 44 LoC
 */
export default function themeToTachyons(theme: Theme) {
  const transformedTheme = Object.entries(theme).reduce<{
    [Key: string]: unknown
  }>((acc, [key, value]) => {
    const matchingKey = KEY_MAPPING[key]
    if (!matchingKey) {
      return {
        ...acc,
        [key]: value,
      }
    } else if (Array.isArray(matchingKey)) {
      matchingKey.forEach((tachyonsKey) => {
        acc[tachyonsKey] = value
      })

      return acc
    } else {
      return {
        ...acc,
        [matchingKey]: value,
      }
    }
  }, {})

  return transformedTheme
}
