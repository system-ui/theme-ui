/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Progress = React.forwardRef(function Progress(props, ref) {
  return (
    <Box
      ref={ref}
      as="progress"
      variant="progress"
      {...props}
      config={{
        group: 'styles',
        sx: {
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
        },
      }}
    />
  )
})
