/** @jsx jsx */
import { jsx } from 'theme-ui'

export default ({ size = 16, ...props }) => (
  <svg
    {...props}
    viewBox="0 0 16 16"
    width={size}
    height={size}
    sx={{
      pointerEvents: 'none',
    }}>
    <path
      stroke="currentcolor"
      strokeWidth="2"
      fill="none"
      d="M14 6 L8 12 L2 6"
    />
  </svg>
)
