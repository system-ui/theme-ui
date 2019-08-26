;(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('theme-ui'), require('react-color')))
    : typeof define === 'function' && define.amd
    ? define(['theme-ui', 'react-color'], factory)
    : (global.colorPicker = factory(global.themeUi, global.reactColor))
})(this, function(themeUi, reactColor) {
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

  return index
})
//# sourceMappingURL=index.umd.js.map
