import { useState, useEffect } from 'react'
import { useThemeUI } from '@theme-ui/core'
import { Theme, defaultBreakpoints } from '@theme-ui/css'

type defaultOptions = {
  defaultIndex?: number
}

export const useBreakpointIndex = (options: defaultOptions = {}) => {
  const context = useThemeUI()
  const { defaultIndex = 0 } = options
  const breakpoints =
    (context.theme && context.theme.breakpoints) || defaultBreakpoints

  if (typeof defaultIndex !== 'number') {
    throw new TypeError(
      `Default breakpoint index should be a number. Got: ${defaultIndex}, ${typeof defaultIndex}`
    )
  } else if (defaultIndex < 0 || defaultIndex > breakpoints.length - 1) {
    throw new RangeError(
      `Default breakpoint index out of range. Theme has ${breakpoints.length} breakpoints, got index ${defaultIndex}`
    )
  }

  const [value, setValue] = useState(defaultIndex)
  useEffect(() => {
    const getIndex = () =>
      breakpoints.filter(
        (bp) => window.matchMedia(`screen and (min-width: ${bp})`).matches
      ).length

    const onResize = () => {
      const newValue = getIndex()
      if (value !== newValue) {
        setValue(newValue)
      }
    }

    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoints, value])

  return value
}

type Values<T> = ((theme: Theme | null) => T[]) | T[]

export function useResponsiveValue<T>(
  values: Values<T>,
  options: defaultOptions = {}
): T {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex(options)
  return array[index >= array.length ? array.length - 1 : index]
}
