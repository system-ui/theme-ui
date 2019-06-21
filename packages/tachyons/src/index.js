const KEY_MAPPING = {
  space: 'spacing',
  radii: 'borderRadius',
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

export default theme => {
  const transformedTheme = Object.entries(theme).reduce((acc, [key, value]) => {
    if (!KEY_MAPPING[key]) {
      return {
        ...acc,
        [key]: value,
      }
    } else if (Array.isArray(KEY_MAPPING[key])) {
      KEY_MAPPING[key].forEach(tachyonsKey => {
        acc[tachyonsKey] = value
      })

      return acc
    } else {
      return {
        ...acc,
        [KEY_MAPPING[key]]: value,
      }
    }
  }, {})

  return transformedTheme
}
