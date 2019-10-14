import React from 'react'
import { Link as _Link } from 'gatsby'
import Box from './box'

export const GatsbyLink = React.forwardRef((props, ref) => (
  <Box ref={ref} as={_Link} {...props} __themeKey="links" />
))
