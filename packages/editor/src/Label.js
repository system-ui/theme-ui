/** @jsx jsx */
import { jsx } from 'theme-ui'

const Label = props => (
  <label
    {...props}
    sx={{
      display: 'block',
      fontSize: 0,
      fontWeight: 'bold',
    }}
  />
)

export default Label
