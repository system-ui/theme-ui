/** @jsx jsx */
import { jsx } from 'theme-ui'

export default props =>
  <select
    id={props.name}
    {...props}
    css={{
      fontFamily: 'system-ui, sans-serif',
      fontSize: 16,
      p: 2,
    }}
  />
