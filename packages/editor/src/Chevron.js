/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ size = 24, ...props }) => (
  <svg {...props} viewBox="0 0 32 32" width={size} height={size}>
    <path
      fill="none"
      stroke="currentcolor"
      strokeWidth="2"
      d={`
        M4 12
        L16 24
        L28 12
      `}
    />
  </svg>
)
