import React, { useContext } from 'react'
import { jsx as emotion } from '@emotion/core'
import styled from '@emotion/styled'
import { ThemeProvider as EmotionProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
import css from '@styled-system/css'
import { space } from 'styled-system'
import merge from 'lodash.merge'
import get from 'lodash.get'

export { css } from '@styled-system/css'

// custom pragma
export const jsx = (type, props, ...children) =>
  emotion.apply(undefined, [
    type,
    props ? ({
      ...props,
      css: css(props.css)
    }) : null,
    ...children
  ])

const tags = [
  'p',
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

const themed = key => props => css(get(props.theme, `styles.${key}`))(props.theme)

export const Styled = styled('div')(themed('div'), space)

const components = {}
tags.forEach(tag => {
  components[tag] = styled(alias(tag))(themed(tag), space)
  Styled[tag] = components[tag]
})

export const Context = React.createContext({
  theme: {},
  components,
})

const createComponents = (components = {}) => {
  const next = {}
  Object.keys(components).forEach(key => {
    next[key] = styled(components[key])(themed(key))
  })
  return next
}

export const ComponentProvider = ({
  theme,
  components,
  ...props
}) => {
  const outer = useContext(Context)
  const context = merge({}, outer, {
    theme,
    components: createComponents(components),
  })

  return (
    jsx(EmotionProvider, { theme: context.theme },
      jsx(MDXProvider, { components: context.components },
        jsx(Context.Provider, {
          value: context,
          children: props.children
        })
      )
    )
  )
}

////////
// Potentially remove this
export const useComponents = () => {
  const context = useContext(Context)
  return context.components
}

// This could be removed, but keeping the theme-ui API intact
export const ThemeProvider = props =>
  jsx(ComponentProvider, props)
