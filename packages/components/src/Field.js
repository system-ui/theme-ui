import React from 'react'
import Box from './Box'
import { Label } from './Label'
import { Input } from './Input'

export const Field = React.forwardRef(
  ({ as: Control = Input, label, name, ...props }, ref) => {
    return (
      <Box>
        <Label htmlFor={name}>{label}</Label>
        <Control ref={ref} id={name} name={name} {...props} />
      </Box>
    )
  }
)
