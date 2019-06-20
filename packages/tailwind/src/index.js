const KEY_MAPPING = {
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

export default (theme, config = {}) => {
  const transformedTheme = Object.entries(theme).reduce((acc, [key, value]) => {
    if (!KEY_MAPPING[key]) {
      return {
        ...acc,
        [key]: value,
      }
    } else if (Array.isArray(KEY_MAPPING[key])) {
      KEY_MAPPING[key].forEach(twKey => {
        acc[twKey] = value
      })

      return acc
    } else {
      return {
        ...acc,
        [KEY_MAPPING[key]]: value,
      }
    }
  }, {})

  return {
    ...config,
    theme: transformedTheme,
  }
}
