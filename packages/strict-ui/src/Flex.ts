/* @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Flex as Reflex, BoxProps } from 'reflexbox'

export const Flex = (
  props: BoxProps & {
    gap?: number
    children: React.ReactChildren | React.ReactChildren[]
  }
) => {
  let { children, ...rest } = props

  if (typeof props.gap === 'number' && props.gap !== 0) {
    children = React.Children.map(children, (child, index) =>
      jsx(
        'div',
        {
          sx: index !== 0 ? { marginLeft: props.gap } : {},
        },
        child
      )
    )
  }

  return jsx(Reflex, rest, children)
}
