/** @jsx jsx */
import { jsx } from 'theme-ui'

const Field = ({ children, label }) => (
  <div
    sx={{
      my: 3,
    }}
  >
    <label
      sx={{
        display: 'block',
        fontSize: 'inherit',
        mb: 1,
      }}
    >
      {label}
    </label>
    <div>{children}</div>
  </div>
)

export default Field
