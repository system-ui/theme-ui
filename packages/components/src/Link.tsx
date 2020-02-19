import React from 'react'
import Box, { Assign, BoxOwnProps, ForwardRef } from './Box'

export interface LinkProps
  extends Assign<React.ComponentPropsWithRef<'a'>, BoxOwnProps> {}
/**
 * Link variants can be defined in the `theme.links` object.
 * By default the Link component will use styles defined in `theme.styles.a`.
 * @see https://theme-ui.com/components/link
 */

export const Link: ForwardRef<HTMLAnchorElement, LinkProps> = React.forwardRef(
  (props, ref) => (
    <Box
      ref={ref} // TODO
      as="a"
      variant="styles.a"
      {...props}
      __themeKey="links"
    />
  )
)
