export const getBreakpointIndex = (ar = [], v) => {
  const len = ar.length
  for (let i = 0; i < len; i++) {
    if (v <= ar[i]) {
      return i
    }
  }
  return len
}

export const em2px = (el, v) =>
  parseFloat(getComputedStyle(el.parentNode).fontSize) * parseFloat(v)

export const rem2px = v =>
  parseFloat(getComputedStyle(document.documentElement).fontSize) *
  parseFloat(v)

const supportedUnits = new Set(['em', 'rem', 'px'])

export const unit2px = (el, val) => {
  const m = {
    px: (_, v) => parseFloat(v),
    rem: (_, v) => rem2px(v),
    em: (el, v) => em2px(el, v),
    noop: (_, v) => v,
  }

  const match = val.match(/[a-z]+/i)
  const unit = match && supportedUnits.has(match[0]) ? match[0] : 'noop'
  return m[unit](el, val)
}
