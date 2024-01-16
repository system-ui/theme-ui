import React from 'react'

import { Box } from './Box'
import { Label } from './Label'
import { Input, InputProps } from './Input'
import type { ThemeUICSSObject } from '@theme-ui/css'

export interface FieldOwnProps {
  /**
   * Text for Label component
   */
  label?: string
  /**
   * Used for the for, id, and name attributes
   */
  name?: string
  containerSx?: ThemeUICSSObject
}

export type FieldProps<T extends React.ElementType> = FieldOwnProps &
  Omit<React.ComponentPropsWithRef<T>, 'as' | keyof FieldOwnProps> & {
    /**
     * form control to render, default Input
     */
    as?: T
  }

export interface Field {
  <T extends React.ElementType = React.ComponentType<InputProps>>(
    props: FieldProps<T>
  ): JSX.Element
}

export const Field = React.forwardRef(function Field<
  T extends React.ElementType = React.ComponentType<InputProps>
>(
  {
    // if somebody specifies the generic parameter without passing `as` prop, they get Input anyway
    as: Control = Input as any as T,
    label,
    id,
    name,
    containerSx,
    ...rest
  }: FieldProps<T>,
  ref: React.ForwardedRef<unknown>
) {
  const fieldIdentifier = id || name

  const controlProps = {
    ref,
    name,
    id: fieldIdentifier,
    ...rest,
  } as React.ComponentPropsWithRef<T>

  return (
    <Box sx={containerSx}>
      <Label htmlFor={fieldIdentifier}>{label}</Label>
      <Control {...controlProps} />
    </Box>
  )
}) as Field // Field is generic bcs of `as` prop, so we can't just use types from forwardRef
