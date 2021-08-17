import React from 'react'
import { Box, BoxOwnProps, BoxProps } from './Box'

export type FlexOwnProps = BoxOwnProps
export type FlexProps = BoxProps

// export declare const Flex: StyledComponent<FlexOwnProps, FlexProps>

const __Flex = (props: FlexProps) => (
  <Box
    {...props}
    sx={{
      display: 'flex',
      ...props.sx,
    }}
  />
)

__Flex.displayName = 'Flex'

/**
 * Use the Flex component to create flexbox layouts.
 * @see https://theme-ui.com/components/flex
 */
export const Flex = __Flex as typeof __Flex & {
  /**
   * @deprecated
   */
  withComponent: (Component: React.ElementType) => React.ComponentType<BoxProps>
}

Flex.withComponent =
  (component) =>
  ({ as, ...props }) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        '[theme-ui] You’re using the `.withComponent` API on a Theme UI component. This API will be deprecated in the next version; pass the `as` prop instead.'
      )
    }
    return <Flex as={component} {...props} />
  }
