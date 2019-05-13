import { createContext, useContext } from 'react'
import styled from '@emotion/styled'
import { ThemeProvider as EmotionProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
import merge from 'lodash.merge'
import jsx from './jsx'
import themed from './themed'
import { components } from './components'

export const Context = createContext({
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
