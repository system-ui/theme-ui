// layout components like this one might make sense
// in the core theme-ui package
import React from 'react'
import { css } from 'theme-ui'

export default props =>
  <div
    {...props}
    css={css({
      maxWidth: 768,
      mx: 'auto',
      p: 4,
    })}
  />
