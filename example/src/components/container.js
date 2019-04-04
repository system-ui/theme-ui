// layout components like this one might make sense
// in the core theme-ui package
import React from 'react'
import { css } from 'theme-ui'

export default props =>
  <div
    {...props}
    css={css({
      width: '100%',
      maxWidth: 768,
      minWidth: 0,
      mx: 'auto',
      p: 4,
    })}
  />
