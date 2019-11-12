import React from 'react'
import Box from './Box'
import { Label } from './Label'
import { Input } from './Input'
import { getMargin, omitMargin } from './util'

export const Field = React.forwardRef(({
  as: Control = Input,
  label,
  name,
  ...props
}, ref) => {
  return (
    <Box {...getMargin(props)}>
      <Label htmlFor={name}>
        {name}
      </Label>
      <Control
        ref={ref}
        id={name}
        name={name}
        {...omitMargin(props)}
      />
    </Box>
  )
})
