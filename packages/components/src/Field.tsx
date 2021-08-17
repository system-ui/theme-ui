import React from 'react'
import Box from './Box'
import { Label } from './Label'
import { Input } from './Input'
import { getMargin, omitMargin } from './util'

export const Field = React.forwardRef(function Field(
  { as: Control = Input, label, id, name, ...props },
  ref
) {
  const fieldIdentifier = id || name

  return (
    <Box {...getMargin(props)}>
      <Label htmlFor={fieldIdentifier}>{label}</Label>
      <Control
        ref={ref}
        id={fieldIdentifier}
        name={name}
        {...omitMargin(props)}
      />
    </Box>
  )
})
