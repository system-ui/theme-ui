/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props => {
  return (
    <div
      sx={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: 16,
        lineHeight: 1.5,
      }}>
      {props.children}
    </div>
  )
}
