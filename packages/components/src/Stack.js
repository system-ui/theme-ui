import React from 'react'
import { Box } from './Box'

export const merge = (...objs) => {
  return objs.reduce(function(merged, currentValue) {
    return mergeTwo(merged, currentValue)
  }, {})
}

const createSpace = (direction, space) => {
  if (direction === 'vertical') {
    return {
      marginBottom: space,
      marginRight: 0,
    }
  }

  return {
    marginBottom: 0,
    marginRight: space,
  }
}

export const Stack = React.forwardRef(
  (
    {
      space = 2,
      direction = 'vertical',
      inline = false,
      justify = 'normal',
      align = 'normal',
      children,
      ...props
    },
    ref
  ) => {
    const styles = {
      display: inline ? 'inline-flex' : 'flex',
      width: '100%',
      justifyContent: justify,
      alignItems: align,
    }

    if (Array.isArray(direction)) {
      styles.flexDirection = direction.map(d =>
        d === 'vertical' ? 'column' : 'row'
      )
      styles['> *:not(:last-child)'] = direction.map(d => createSpace(d, space))
    } else {
      styles.flexDirection = direction === 'vertical' ? 'column' : 'row'
      styles['> *:not(:last-child)'] = createSpace(direction, space)
    }

    return (
      <Box ref={ref} {...props} __themeKey="stacks" __css={styles}>
        {children}
      </Box>
    )
  }
)
