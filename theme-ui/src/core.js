import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect
} from 'react'
import styled from '@emotion/styled'
import { ThemeProvider as EmotionProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
import merge from 'lodash.merge'
import get from 'lodash.get'
import jsx from './jsx'
import themed from './themed'
import { components } from './components'

export const Context = createContext({
  theme: {},
  components,
})

export const useThemeUI = () => useContext(Context)

export const useColorMode = (initialMode) => {
  const { colorMode, setColorMode } = useThemeUI()
  return [ colorMode, setColorMode ]
}

const STORAGE_KEY = '__theme-ui-color-mode'
const useColorModeState = (initialMode, args = []) => {
  const [ colorMode, setColorMode ] = useState(initialMode)
  useLayoutEffect(() => {
    const storedMode = window.localStorage.getItem(STORAGE_KEY)
    if (storedMode !== colorMode) setColorMode(storedMode)
  }, [])
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, colorMode)
  }, [colorMode])

  return { colorMode, setColorMode }
}

const createComponents = (components = {}) => {
  const next = {}
  Object.keys(components).forEach(key => {
    next[key] = styled(components[key])(themed(key))
  })
  return next
}

export const ThemeProvider = ({
  theme,
  components,
  ...props
}) => {
  const { colorMode, setColorMode } = useColorModeState()
  const outer = useThemeUI()
  const context = merge({}, outer, {
    theme,
    components: createComponents(components),
    colorMode,
    setColorMode,
  })

  if (colorMode) {
    context.theme = merge({}, context.theme, {
      colors: get(context.theme.colors.modes, colorMode, context.theme.colors)
    })
  }

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
