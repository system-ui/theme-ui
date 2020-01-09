/** @jsx jsx */
import { jsx } from 'theme-ui'

// todo: replace with Grid?
export default ({ width = 64, ...props }) => (
  <div
    {...props}
    sx={{
      display: 'grid',
      gridGap: 2,
      gridTemplateColumns: `repeat(auto-fit, minmax(${width}px, 1fr))`,
    }}
  />
)
