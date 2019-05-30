const { jsx, ColorModeProvider } = require('theme-ui')

exports.wrapRootElement = ({ element }, opts) =>
  jsx(ColorModeProvider, opts, element)
