import React from 'react'
import Box from './Box'
import { Label } from './Label'
import { Input } from './Input'
import { getMargin, omitMargin } from './util'

export const Field = React.forwardRef(function Field(
  { as: Control = Input, label, name, ...props },
  ref
) {
  return (
    <Box {...getMargin(props)} __css={{ label: 'Field' }}>
      <Label htmlFor={name}>{label}</Label>
      <Control ref={ref} id={name} name={name} {...omitMargin(props)} />
    </Box>
  )
})
