/** @jsx jsx */
import { jsx } from '@theme-ui/core'
import React from 'react'
import Box from './Box'

export const Link = React.forwardRef(function Link(props, ref) {
  return (
    <Box
      ref={ref}
      as="a"
      variant="styles.a"
      {...props}
      config={{
        group: 'links',
      }}
    />
  )
})
