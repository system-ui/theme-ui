import React from 'react'
import { css } from 'theme-ui'

export default props =>
  <div
    {...props}
    css={css({
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    })}
  />
