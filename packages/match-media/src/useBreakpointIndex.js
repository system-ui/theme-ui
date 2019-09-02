import { useState, useEffect, useCallback } from 'react'
import { useThemeUI } from 'theme-ui'

const useBreakpointIndex = () => {
  const {
    theme: { breakpoints },
  } = useThemeUI()

  const getIndex = useCallback(() => {
    let index = breakpoints.findIndex(
      breakpoint => window.matchMedia(`(max-width: ${breakpoint})`).matches
    )
    if (index === -1) {
      index = breakpoints.length - 1
    }
    return index
  }, [breakpoints])

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
