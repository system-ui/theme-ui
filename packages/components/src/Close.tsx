import React from 'react'

import { IconButton, IconButtonProps } from './IconButton'
import type { ForwardRef } from './types'

export const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

export interface CloseProps extends Omit<IconButtonProps, 'children'> {}
/**
 * Button with close (×) icon.
 *
 * The Close component renders as a <button> element by default.
 * Pass any button attributes as props to the component.
 *
 * Close component variants can be defined in the theme.buttons object.
 * The Close component uses theme.buttons.close as its default variant style.
 */
export const Close: ForwardRef<HTMLButtonElement, CloseProps> =
  React.forwardRef(function Close({ size = 32, ...props }, ref) {
    return (
      <IconButton
        ref={ref}
        size={size}
        title="Close"
        aria-label="Close"
        variant="close"
        {...props}
        children={CloseIcon}
      />
    )
  })
