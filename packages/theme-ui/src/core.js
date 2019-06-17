import { ThemeContext as EmotionContext } from '@emotion/core'
import { MDXProvider } from '@mdx-js/react'
import { get } from '@styled-system/css'
import jsx from './jsx'
import { Context, useTheme } from './context'

export const ThemeProvider = ({
  theme,
  components,
  ...props
}) => {
  const context = useTheme({ theme, components })

  return (
    jsx(EmotionContext.Provider, { value: context.theme },
      jsx(MDXProvider, { components: context.components },
        jsx(Context.Provider, {
          value: context,
          children: props.children
        })
      )
    )
  )
}
