import React, { useContext } from 'react'
import { jsx } from '@emotion/core'
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

const themed = key => theme => theme.css(get(theme, `styles.${key}`))(theme)

const styled = (tag, key) => ({ as = tag, ...props }) => jsx(alias(as), {
  ...props,
  css: themed(key)
})

const components = {}

export const Styled = React.forwardRef(({
  tag = 'div',
  ...props
}, ref) => {
  const components = useComponents()
  const type = components[tag] || 'div'
  return jsx(type, { ...props, ref })
})

const createStyled = tag => React.forwardRef((props, ref) =>
  jsx(Styled, { ref, tag, ...props })
)

tags.forEach(tag => {
  components[tag] = styled(tag, tag)
  Styled[tag] = createStyled(tag)
})

const createComponents = (components = {}) => {
  const next = {}
  Object.keys(components).forEach(key => {
    next[key] = styled(components[key], key)
    Styled[key] = createStyled(key)
  })
  return next
}

const noop = n => () => n

const baseContext = {
  theme: {
    css: noop,
  },
  components,
}

export const Context = React.createContext(baseContext)

export const ComponentProvider = ({
  theme,
  components,
  transform,
  ...props
}) => {
  const outer = useContext(Context)
  const context = merge({}, outer, {
    theme: merge({}, theme, {
      css: transform,
    }),
    components: createComponents(components),
  })

  return (
    <EmotionProvider theme={context.theme}>
      <MDXProvider components={context.components}>
        <Context.Provider value={context}>
          {props.children}
        </Context.Provider>
      </MDXProvider>
    </EmotionProvider>
  )
}

export const useComponents = () => {
  const context = useContext(Context)
  return context.components
}

// This could be removed, but keeping the theme-ui API intact
export const ThemeProvider = props =>
  <ComponentProvider
    {...props}
    transform={css}
  />

