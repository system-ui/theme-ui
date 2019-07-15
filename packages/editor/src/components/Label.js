/** @jsx jsx */
import { jsx } from 'theme-ui'

const Label = props => (
  <label
    {...props}
    sx={{
      display: 'block',
      fontSize: 'inherit',
      mb: 1,
    }}
  />
)

export default Label
