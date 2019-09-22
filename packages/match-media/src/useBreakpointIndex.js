import { useState, useEffect, useCallback } from 'react'
import { useThemeUI } from 'theme-ui'

const useBreakpointIndex = () => {
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

export default useBreakpointIndex
