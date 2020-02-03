import { useState, useEffect, useRef } from 'react'
import { useThemeUI } from 'theme-ui'

// Shared with @styled-system/css
const defaultBreakpoints = [40, 52, 64].map(n => n + 'em')

export const getBreakpointIndex = (ar = [], v) => {
  const len = ar.length
  for (let i = 0; i < len; i++) {
    if (v <= ar[i]) {
      return i
    }
  }
  return len
}

CSS.registerProperty({
  name: '--bk-size',
  syntax: '<length>',
  inherits: false,
  initialValue: 0,
})

export const useContainerQuery = componentBreakpoints => {
  const { theme = {} } = useThemeUI()

  const ref = useRef(null)
  const [index, setIndex] = useState(0)

  const breakpoints =
    componentBreakpoints || theme.breakpoints || defaultBreakpoints

  useEffect(() => {
    const el = ref.current

    if (!el) {
      return
    }

    const normalizedBreakpoints = breakpoints.map(bk => {
      el.style.setProperty('--bk-size', bk)
      return el.computedStyleMap().get('--bk-size').value
    })

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
