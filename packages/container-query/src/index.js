import { useState, useEffect, useRef } from 'react'
import { useThemeUI } from 'theme-ui'
import { getBreakpointIndex, unit2px } from './utils'

// Shared with @styled-system/css
const defaultBreakpoints = [40, 52, 64].map(n => n + 'em')

export const useContainerQuery = (componentBreakpoints = []) => {
  const context = useThemeUI()
  const ref = useRef(null)
  const [index, setIndex] = useState(0)

  const breakpoints =
    componentBreakpoints ||
    (context.theme && context.theme.breakpoints) ||
    defaultBreakpoints

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    const normalizedBreakpoints = breakpoints.map(bk => unit2px(el, bk))

    const handler = entries => {
      const entry = entries[0]
      const { width } = entry.contentRect
      const index = getBreakpointIndex(normalizedBreakpoints, width)
      setIndex(index)
    }

    const resizeObserver = new ResizeObserver(handler)
    resizeObserver.observe(el)

    return () => resizeObserver.unobserve(el)
  }, [breakpoints])

  return [ref, index]
}
