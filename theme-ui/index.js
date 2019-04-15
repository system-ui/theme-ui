import React, { useContext } from 'react'
import { jsx } from '@emotion/core'
import styled from '@emotion/styled'
import { ThemeProvider as EmotionProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
import css from '@styled-system/css'
import merge from 'lodash.merge'
import get from 'lodash.get'

export { css } from '@styled-system/css'

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
  'wrapper',
  'inlineCode',
  'thematicBreak',
  // extras
  'div',
]

const aliases = {
  inlineCode: 'code',
  thematicBreak: 'hr',
  wrapper: 'div',
}

const alias = n => aliases[n] || n

const themed = key => theme => css(get(theme, `styles.${key}`))(theme)

export const Styled = React.forwardRef(({
  tag = 'div',  // tag is used as a key in theme.styles
  as,           // as replaces the rendered element type
  ...props
}, ref) =>
  jsx(as || tag, {
    ...props,
    ref,
    css: themed(tag)
  })
)

const components = {}
tags.forEach(tag => {
  components[tag] = styled(alias(tag))(props => themed(tag)(props.theme))
  Styled[tag] = React.forwardRef((props, ref) =>
    jsx(Styled, { ref, tag, ...props })
  )
})

export const Context = React.createContext({
  theme: {},
  components,
})

const createComponents = (components = {}) => {
  const next = {}
  Object.keys(components).forEach(key => {
    next[key] = styled(components[key])(props => themed(key)(props.theme))
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
