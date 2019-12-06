// - [ ] ComponentProvider
// - [ ] base markdown components
// - [ ] consider switching back to @emotion/styled

import { jsx } from '@theme-ui/core'
import { css, get } from '@theme-ui/css'
import React from 'react'
import { ThemeContext } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import { MDXProvider as _MDXProvider } from '@mdx-js/react'

// mdx components
const tags = [
  'p',
  'b',
  'i',
  'a',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'img',
  'pre',
  'code',
  'ol',
  'ul',
  'li',
  'blockquote',
  'hr',
  'em',
  'table',
  'tr',
  'th',
  'td',
  'em',
  'strong',
  'delete',
  // mdx
  'inlineCode',
  'thematicBreak',
  // other
  'div',
  // theme-ui
  'root',
]

const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  root: 'div',
}

const alias = n => aliases[n] || n

export const styled = tag => (...args) => {
  const Component = React.forwardRef(({ as, ...props }, ref) => {
    const shouldForwardProps =
      typeof tag !== 'string' || (as && typeof as !== 'string')
    const theme = React.useContext(ThemeContext)
    let nextProps = shouldForwardProps ? props : {}
    let styles = {}
    args.forEach(arg => {
      const style = typeof arg === 'function' ? arg({ theme, ...props }) : arg
      Object.assign(styles, style)
    })

    if (!shouldForwardProps) {
      for (let key in props) {
        if (!isPropValid(key)) continue
        nextProps[key] = props[key]
      }
    }

    return jsx(as || tag, {
      ...nextProps,
      ref,
      css: styles,
    })
  })
  return Component
}

export const themed = key => props =>
  css(get(props.theme, `styles.${key}`))(props.theme)

export const Styled = styled('div')(themed('div'))

export const components = {}

tags.forEach(tag => {
  components[tag] = styled(alias(tag))(themed(tag))
  Styled[tag] = components[tag]
})

const createComponents = (comps = {}) => {
  const next = { ...components }
  Object.keys(comps).forEach(key => {
    next[key] = styled(comps[key])(themed(key))
  })
  return next
}

export const MDXProvider = ({
  components,
  children,
}) => {
  return jsx(_MDXProvider, {
    components: createComponents(components),
    children,
  })
}
