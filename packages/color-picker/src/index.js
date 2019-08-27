/** @jsx jsx */
import { jsx } from 'theme-ui'
import { CustomPicker } from 'react-color'
import {
  Hue,
  Saturation,
  EditableInput,
} from 'react-color/lib/components/common'

const Box = ({ height = 16, ...props }) => (
  <div
    {...props}
    sx={{
      position: 'relative',
      width: 256,
      height,
    }}
  />
)

const Lens = props => <div {...props} sx={{}} />

const Handle = props => <div {...props} sx={{}} />

export default CustomPicker(props => {
  return (
    <div
      sx={{
        display: 'grid',
        gridGap: 2,
      }}>
      <Box height={256}>
        <Saturation {...props} />
      </Box>
      <Box height={8}>
        <Hue {...props} />
      </Box>
      <EditableInput
        {...props}
        value={props.hex}
        sx={{
          width: '100%',
          fontSize: 'inherit',
          fontFamily: 'inherit',
        }}
      />
    </div>
  )
})
