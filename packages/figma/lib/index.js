// transform figma document into theme object
const { get } = require('dot-prop')
const chroma = require('chroma-js')
const { struct } = require('superstruct')

const FILL = 'FILL'
const TEXT = 'TEXT'

const flatten = (arr = []) => arr.reduce((a, b) => {
  return [
    ...a,
    b,
    ...flatten(b.children)
  ]
}, [])

// schema
const Theme = struct({
  colors: 'object',
  textStyles: struct.dict([
    'string',
    struct({
      fontFamily: 'string',
      fontSize: 'number',
      fontWeight: 'number',
      lineHeight: 'number',
    })
  ]),
  fonts: 'array',
  fontSizes: 'array',
  fontWeights: 'array',
  lineHeights: 'array',
  metadata: 'object?'
})

const Data = struct.partial({
  name: 'string',
  lastModified: 'string',
  thumbnailUrl: 'string',
  document: struct.partial({
    children: struct.list([ 'object' ]),
  }),
  styles: struct.dict([
    'string',
    struct.partial({
      name: 'string',
      styleType: 'string',
    })
  ])
})

const unique = arr => [...new Set(arr)]

module.exports = (data, opts = {}) => {
  Data(data)
  const {
    styles = {},
    document: {
      children: tree = []
    }
  } = data
  const children = flatten(tree)

  const styleKeys = Object.keys(styles)
  const stylesArray = styleKeys.map(key => Object.assign({
    id: key
  }, styles[key]))

  // colors
  const colorStyles = stylesArray.filter(style => style.styleType === FILL)
  const colorArray = colorStyles.map(style => {
    const child = children
      .find(child => get(child, 'styles.fill') === style.id)
    if (!child) return

    const [ fill = {} ] = child.fills || []
    const { r, g, b, a } = fill.color
    const rgb = [ r, g, b ].map(n => n * 255)
    const color = chroma.rgb(rgb)
    return {
      id: style.id,
      name: style.name,
      value: color.hex()
    }
  })
  .filter(Boolean)

  const colors = colorArray.reduce((a, color) => Object.assign({}, a, {
    [color.name]: color.value
  }), {})

  // textStyles
  const textStyles = stylesArray.filter(style => style.styleType === TEXT)
  const textArray = textStyles.map(style => {
    const child = children
      .find(child => get(child, 'styles.text') === style.id)
    if (!child) return
    return {
      id: style.id,
      name: style.name,
      value: child.style
    }
  })
    .filter(Boolean)
    .map(style => {
      const {
        fontFamily,
        fontWeight,
        fontSize,
        letterSpacing
      } = style.value
      const lineHeight = style.value.lineHeightPercent / 100
      return Object.assign({}, style, {
        value: {
          fontFamily,
          fontWeight,
          fontSize,
          lineHeight
        }
      })
    })

  const textStylesObject = textArray.reduce((a, style) => Object.assign({}, a, {
    [style.name]: style.value
  }), {})

  const fontSizes = unique(textArray.map(style => style.value.fontSize))
    .sort()

  const fontWeights = unique(textArray.map(style => style.value.fontWeight))
    .sort()
  const fonts = unique(textArray.map(style => style.value.fontFamily))
  const lineHeights = unique(textArray.map(style => style.value.lineHeight))

  const theme = {
    colors,
    textStyles: textStylesObject,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights
  }

  if (opts.metadata) {
    theme.metadata = {
      name: data.name,
      lastModified: data.lastModified,
      thumbnailUrl: data.thumbnailUrl,
      children,
      styles: stylesArray
    }
  }

  // validate
  Theme(theme)

  return theme
}

module.exports.schemas = {
  Data,
  Theme
}
