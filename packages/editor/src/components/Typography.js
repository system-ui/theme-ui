import React, { forwardRef } from 'react'

export const Heading = forwardRef(
  ({ as, level, marginBottom, marginTop, ...props }, ref) => {
    const Tag = as || `h${level}`
    return <Tag ref={ref} {...props} />
  }
)
