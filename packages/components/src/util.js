import { ThemeContext } from '@emotion/core'
import React from 'react'
import { get } from '@theme-ui/css'

export const getProps = test => props => {
  const next = {}
  for (const key in props) {
    if (test(key || '')) next[key] = props[key]
  }
  return next
}

const MRE = /^m[trblxy]?$/

export const getMargin = getProps(k => MRE.test(k))
export const omitMargin = getProps(k => !MRE.test(k))

export const useVariant = (key, variant) => {
  const theme = React.useContext(ThemeContext)
  if (variant) {
    const variantStyle = get(theme, key + '.' + variant)
    if (variantStyle) {
      return variantStyle
    }
  }
  return {}
}
