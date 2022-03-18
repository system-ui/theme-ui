import React from 'react'

import { Box, BoxOwnProps, BoxProps } from './Box'
import type { Assign, ForwardRef } from './types'
import { __internalProps } from './util'

export interface LinkProps
  extends Assign<React.ComponentPropsWithRef<'a'>, BoxOwnProps> {}

/**
 * Link variants can be defined in the `theme.links` object.
 * By default the Link component will use styles defined in `theme.styles.a`.
 * @see https://theme-ui.com/components/link
 */
export const Link: ForwardRef<HTMLAnchorElement, LinkProps> = React.forwardRef(
  function Link(props, ref) {
    return (
      <Box
        ref={ref}
        as="a"
        variant="styles.a"
        {...(props as BoxProps)}
        {...__internalProps({ __themeKey: 'links' })}
      />
    )
  }
)
