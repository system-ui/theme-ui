import React from 'react'
import { Link as _Link } from 'gatsby'
import { Link } from './link'

export const GatsbyLink = React.forwardRef((props, ref) => (
  <Link ref={ref} as={_Link} {...props} />
))
