const MRE = /^m[trblxy]?$/

export const getProps = test => props => {
  const next = {}
  for (const key in props) {
    if (test(key || '')) next[key] = props[key]
  }
  return next
}

export const getMargin = getProps(k => MRE.test(k))
export const omitMargin = getProps(k => !MRE.test(k))
