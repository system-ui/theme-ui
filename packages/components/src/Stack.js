import React from 'react'
import { Box } from './Box'

export const Stack = React.forwardRef(
  ({ gap = 2, children, ...props }, ref) => {
    /** Make a copy of the children so we can pass the styles as props instead of using brittle CSS selectors */
    const elements = React.Children.map(children, (element, index) => {
      if (index === 0) {
        return element
      }

      const newProps = {
        marginTop: gap,
      }

      return React.cloneElement(element, newProps)
    })

    return (
      <Box ref={ref} {...props} __themeKey="stacks">
        {elements}
      </Box>
    )
  }
)
