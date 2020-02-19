import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface ProgressProps
  extends Assign<React.ComponentProps<'progress'>, BoxOwnProps> {}
/**
 * @see https://theme-ui.com/components/progress/
 */

export const Progress: ForwardRef<
  HTMLProgressElement,
  ProgressProps
> = React.forwardRef((props, ref) => (
  <Box
    ref={ref} //TODO
    as="progress"
    variant="styles.progress"
    {...props}
    css={{
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
