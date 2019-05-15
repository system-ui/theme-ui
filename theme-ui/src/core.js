import styled from '@emotion/styled'
import { ThemeProvider as EmotionProvider } from 'emotion-theming'
import { MDXProvider } from '@mdx-js/react'
import merge from 'lodash.merge'
import get from 'lodash.get'
import jsx from './jsx'
import themed from './themed'
import { useColorState } from './use-color-mode'
import { Context, useThemeUI } from './context'

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
  const outer = useThemeUI()
  const [ colorMode, setColorMode ] = useColorState(outer.colorMode)
  const context = merge({
    colorMode,
    setColorMode,
  }, outer, {
    theme,
    components: createComponents(components),
  })

  if (colorMode) {
    const modes = get(context.theme, 'colors.modes', {})
    context.theme = merge({}, context.theme, {
      colors: get(modes, colorMode, context.theme.colors)
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
