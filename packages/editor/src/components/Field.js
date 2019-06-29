/** @jsx jsx */
import { jsx } from 'theme-ui'

const Field = ({ children, label }) => (
  <div
    css={{
      my: 3,
    }}
  >
    <label
      css={{
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
