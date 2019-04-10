import React from 'react'
import { Link } from 'gatsby'
import { css } from 'theme-ui'

export default props =>
  <Link
    {...props}
    css={css({
      display: 'inline-block',
      px: 2,
      py: 3,
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
    })}
  />
