/* @jsx jsx */
import React from 'react'
import { jsx } from 'theme-ui'
import { Flex as Reflex, BoxProps } from 'reflexbox'

export const Flex = (
  props: BoxProps & {
    gap?: number
    children: React.ReactNode
  }
) => {
  let { children, ...rest } = props

  if (typeof props.gap === 'number' && props.gap !== 0) {
    children = React.Children.map(children, (child, index) => {
      if (!child) return child

      return jsx(
        'div',
        {
          sx:
            index !== 0
              ? {
                  [props.flexDirection === 'column'
                    ? 'marginTop'
                    : 'marginLeft']: props.gap,
                }
              : {},
        },
        child
      )
    })
  }

  return jsx(Reflex, rest, children)
}
