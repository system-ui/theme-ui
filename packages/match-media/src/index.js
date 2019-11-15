import { useState, useEffect, useCallback } from 'react'
import { useThemeUI } from 'theme-ui'

// Shared with @styled-system/css
const defaultBreakpoints = [40, 52, 64].map(n => n + 'em')

export const useBreakpointIndex = defaultIndex => {
  const context = useThemeUI()
  const breakpoints =
    (context.theme && context.theme.breakpoints) || defaultBreakpoints

  const getIndex = useCallback(() => {
    if (typeof window === 'undefined') {
      if (typeof defaultIndex === 'number') {
        if (0 < defaultIndex || defaultIndex > breakpoints.length - 1) {
          throw new RangeError(
            `Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`
          )
        }
        return defaultIndex
      }
      throw new TypeError(
        'To use @theme-ui/match-media hooks on the server, you must pass a default index. Got: ' +
          defaultIndex
      )
    }

    return breakpoints.filter(
      breakpoint =>
        window.matchMedia(`screen and (min-width: ${breakpoint})`).matches
    ).length
  }, [breakpoints, defaultIndex])

  const [value, setValue] = useState(getIndex)

  useEffect(() => {
    const onResize = () => {
      const newValue = getIndex()
      if (value !== newValue) {
        setValue(newValue)
      }
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoints, getIndex, value])

  return value
}

export const useResponsiveValue = (values, defaultIndex) => {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex(defaultIndex)
  return array[index >= array.length ? array.length - 1 : index]
}
