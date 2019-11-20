import { useCallback, useEffect, useState } from "react"
import { useThemeUI } from "theme-ui"

// Shared with @styled-system/css
const defaultBreakpoints = [40, 52, 64].map(n => n + "em")

/*
* Default breakpoint is used for static gen safety when window is not defined
* */
export const useBreakpointIndex = (defaultStaticBreakpoint = 0) => {
  const context = useThemeUI()
  const breakpoints =
    (context.theme && context.theme.breakpoints) || defaultBreakpoints


  const getIndex = useCallback(
    () => {
      // add support for static site
      if (typeof window === "undefined") {
        return defaultStaticBreakpoint
      }
      return breakpoints.filter(
        breakpoint =>
          window.matchMedia(`screen and (min-width: ${breakpoint})`).matches,
      ).length
    },
    [breakpoints],
  )

  const [value, setValue] = useState(getIndex)

  useEffect(() => {
    const onResize = () => {
      const newValue = getIndex()
      if (value !== newValue) {
        setValue(newValue)
      }
    }
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [breakpoints, getIndex, value])

  return value
}


export const useResponsiveValue = (values, defaultStaticBreakpoint = 0) => {
  const { theme } = useThemeUI()
  const array = typeof values === "function" ? values(theme) : values
  const index = useBreakpointIndex(defaultStaticBreakpoint)
  return array[index >= array.length ? array.length - 1 : index]
}
