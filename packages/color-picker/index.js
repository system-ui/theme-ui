var themeUi = require('theme-ui')
var reactColor = require('react-color')

/** @jsx jsx */

var Box = function(props) {
  return themeUi.jsx(
    'div',
    Object.assign({}, props, {
      sx: {
        position: 'relative',
      },
    })
  )
}

var index = reactColor.CustomPicker(function(props) {
  console.log(props)
  return themeUi.jsx(
    'div',
    null,
    'ColorPicker ',
    themeUi.jsx(Box, null, themeUi.jsx(reactColor.Hue, props))
  )
})

module.exports = index
//# sourceMappingURL=index.js.map
