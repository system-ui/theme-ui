import React from 'react'
import { css } from 'theme-ui'

export default props =>
  <div
    {...props}
    css={css({
      fontWeight: 'bold',
      fontSize: 1,
      p: 3,
      bg: 'highlight',
    })}
  />
