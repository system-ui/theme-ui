import { Theme } from '@theme-ui/css'

const KEY_MAPPING: {
  readonly [Key: string]: string | string[]
} = {
  space: 'spacing',
  radii: 'borderRadius',
  fonts: 'fontFamily',
  borderStyles: 'borderStyle',
  shadows: 'boxShadow',
  fontSizes: 'fontSize',
  fontWeights: 'fontWeight',
  lineHeights: 'lineHeight',
  letterSpacings: 'letterSpacing',
  size: ['height', 'maxHeight', 'width', 'maxWidth'],
  zIndices: 'zIndex',
}

export default (theme: Theme, config: { [Key: string]: unknown } = {}) => {
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
      matchingKey.forEach(twKey => {
        acc[twKey] = value
      })

      return acc
    } else {
      return {
        ...acc,
        [matchingKey]: value,
      }
    }
  }, {})

  return {
    ...config,
    theme: transformedTheme,
  }
}
