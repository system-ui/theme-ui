import { jsx } from '@theme-ui/core'
import { css, get } from '@theme-ui/css'
import React from 'react'
import { ThemeContext } from '@emotion/core'
import styled from '@emotion/styled'
import {
  MDXProvider as _MDXProvider,
  useMDXComponents
} from '@mdx-js/react'

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
  'del',
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

export const themed = key => props =>
  css(get(props.theme, `styles.${key}`))(props.theme)

export const Styled = styled('div')(themed('div'))

export const components = {}

tags.forEach(tag => {
  components[tag] = styled(alias(tag))(themed(tag))
  Styled[tag] = components[tag]
})

const createComponents = comps => {
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
  const outer = useMDXComponents()

  return jsx(_MDXProvider, {
    components: createComponents({ ...outer, ...components }),
    children,
  })
}
