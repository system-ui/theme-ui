import { jsx } from 'theme-ui'
import { CustomPicker, Hue } from 'react-color'

/** @jsx jsx */

var Box = function(props) {
  return jsx(
    'div',
    Object.assign({}, props, {
      sx: {
        position: 'relative',
      },
    })
  )
}

var index = CustomPicker(function(props) {
  console.log(props)
  return jsx('div', null, 'ColorPicker ', jsx(Box, null, jsx(Hue, props)))
})

export default index
//# sourceMappingURL=index.esm.js.map
