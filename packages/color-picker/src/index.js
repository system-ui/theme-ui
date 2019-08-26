/** @jsx jsx */
import { jsx } from 'theme-ui'
import { CustomPicker, Hue } from 'react-color'

const Box = props => (
  <div
    {...props}
    sx={{
      position: 'relative',
    }}
  />
)

export default CustomPicker(props => {
  console.log(props)
  return (
    <div>
      ColorPicker
      <Box>
        <Hue {...props} />
      </Box>
    </div>
  )
})
