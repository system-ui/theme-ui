import React, { useRef, useEffect, useState } from 'react'
import styled from '@emotion/styled'
import css, { get } from '@styled-system/css'
import { createShouldForwardProp } from '@styled-system/should-forward-prop'
import space from '@styled-system/space'
import color from '@styled-system/color'

const shouldForwardProp = createShouldForwardProp([
  ...space.propNames,
  ...color.propNames,
])

const variant = ({ theme, variant, __themeKey = 'variants' }) =>
  css(get(theme, __themeKey + '.' + variant, get(theme, variant)))

const getLastIndex = (data, val) =>
  data.length -
  [0, ...data]
    .slice()
    .reverse()
    .findIndex(v => v < val)

const useBreakpoint = (el, breakpoints) => {
  const [bk, setBk] = useState(0)
  if (!el) {
    return
  }

  const handler = entries => {
    const entry = entries[0]
    const { width } = entry.contentRect
    const index = getLastIndex(breakpoints, width)
    setBk(index)
  }

  const resizer = new ResizeObserver(handler)
  resizer.observe(el)
  return bk
}

const BoxFn = styled('div', {
  shouldForwardProp,
})

const ResizedBox = ({ children, ...props }) => {
  const el = useRef(null)
  const [boxEl, setBoxEl] = useState(el.current)
  const breakpoints = [480, 640]
  const bk = useBreakpoint(boxEl, breakpoints)

  useEffect(() => setBoxEl(el.current), [el])

  // a proposal - pass bk as a second argument
  const sx = ({ sx, theme }) => css(sx)(theme, bk)
  const base = ({ __css, theme }) => css(__css)(theme)

  const Box = BoxFn(
    {
      boxSizing: 'border-box',
      margin: 0,
      minWidth: 0,
    },
    base,
    variant,
    space,
    color,
    sx,
    props => props.css
  )

  return (
    <Box ref={el} {...props}>
      {children}
    </Box>
  )
}

export { ResizedBox as Box }
export default ResizedBox
