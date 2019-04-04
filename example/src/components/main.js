import React from 'react'
import { css } from 'theme-ui'

export default props =>
  <div
    {...props}
    css={css({
      flex: '1 1 auto',
      display: 'flex',
    })}
  />
