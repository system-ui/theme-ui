import { useState, useEffect, useCallback } from 'react'
import { useThemeUI } from 'theme-ui'

export const useBreakpointIndex = () => {
  const {
    theme: { breakpoints },
  } = useThemeUI()

  const getIndex = useCallback(
    () =>
      breakpoints.filter(
        breakpoint =>
          window.matchMedia(`screen and (min-width: ${breakpoint})`).matches
      ).length,
    [breakpoints]
  )

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

export const useResponsiveValue = values => {
  const { theme } = useThemeUI()
  const array = typeof values === 'function' ? values(theme) : values
  const index = useBreakpointIndex()
  return array[index >= array.length ? array.length - 1 : index]
}
