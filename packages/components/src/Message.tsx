import React from 'react'
import { ThemeUICSSObject } from '@theme-ui/css'

import { Box, BoxProps } from './Box'
import { ForwardRef } from './types'
import { __internalProps } from './util'

export type MessageProps = BoxProps

/**
 * Styled Box component for callouts and inline messages
 *
 * Message variants can be defined in the theme.messages object.
 * @see https://theme-ui.com/components/message
 */
export const Message: ForwardRef<HTMLDivElement, MessageProps> =
  React.forwardRef(function Message(props, ref) {
    const __css: ThemeUICSSObject = {
      padding: 3,
      paddingLeft: (t) => t.space && Number(t.space[3]) - Number(t.space[1]),
      borderLeftWidth: (t) => t.space && Number(t.space![1]),
      borderLeftStyle: 'solid',
      borderLeftColor: 'primary',
      borderRadius: 4,
      bg: 'highlight',
    }

    return (
      <Box
        ref={ref}
        {...props}
        {...__internalProps({ __themeKey: 'messages', __css })}
      />
    )
  })
