import React from 'react'

import { ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxOwnProps } from './Box'
import type { Assign, ForwardRef } from './types'

export interface ProgressProps
  extends Assign<React.ComponentPropsWithRef<'progress'>, BoxOwnProps> {}

/**
 * @see https://theme-ui.com/components/progress/
 */
export const Progress: ForwardRef<HTMLProgressElement, ProgressProps> =
  React.forwardRef(function Progress(props, ref) {
    const __css: ThemeUICSSObject = {
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
    }

    return (
      <Box
        ref={ref}
        as="progress"
        variant="styles.progress"
        {...props}
        // @ts-expect-error internal prop
        __css={}
      />
    )
  })
