/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import Box from './Box'

export const Flex = (props) => (
  <Box config={{ sx: { display: 'flex' } }} {...props} />
)
