import React from 'react'
import Box from './Box'

export const Progress = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="progress"
    variant="styles.progress"
    {...props}
    __css={{
      display: 'block',
      width: '100%',
      height: '4px',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      appearance: 'none',
      color: 'primary',
      bg: 'gray',
      borderRadius: 9999,
      border: 'none',
      '&::-webkit-progress-bar': {
        bg: 'transparent',
      },
      '&::-webkit-progress-value': {
        bg: 'currentcolor',
      },
      '&::-moz-progress-bar': {
        bg: 'currentcolor',
      },
    }}
  />
))
