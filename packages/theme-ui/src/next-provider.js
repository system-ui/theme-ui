import React, {
  createElement as jsx,
  createContext,
  useReducer,
  useContext,
} from 'react'
import { ThemeContext as Emotion } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import merge from 'lodash.merge'
import get from 'lodash.get'
import { components } from './components'

const IS_DEV = process.env.NODE_ENV !== 'production'
const IS_BROWSER = typeof window !== 'undefined'

if (IS_DEV && IS_BROWSER) {
  window.__THEME_UI__ = window.__THEME_UI__ || {}
}

const Context = createContext({
  theme: {},
  components,
})

const reducer = (state, next) => merge({}, state, next)

const Provider = ({ context, children }) =>
  jsx(Emotion.Provider, { value: context.theme },
    jsx(MDXProvider, { components: context.components },
      jsx(Context.Provider, { value: context },
        children
      )
    )
  )

export const ThemeProvider = ({
  theme,
  children,
}) => {
  const outer = useContext(Context)
  const [ context, setState ] = useReducer(reducer,
    merge(outer, {
      theme,
      colorMode: 'light',
    })
  )
  context.setTheme = theme => setState({ theme })
  context.setColorMode = colorMode => setState({ colorMode })

  context.theme.colors = merge({},
    context.theme.colors,
    get(context.theme, `colors.modes.${context.colorMode}`, {})
  )

  if (IS_DEV && IS_BROWSER) {
    window.__THEME_UI__ = context
  }

  return jsx(Provider, { context },
    children
  )
}

