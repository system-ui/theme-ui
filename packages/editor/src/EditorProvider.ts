import React from 'react'
import { jsx, Context, useThemeUI, merge } from 'theme-ui'
import { ThemeContext as Emotion } from '@emotion/core'
import { Theme } from '@theme-ui/css'
import { EditorContext } from './types'

const reducer = (state: Theme, next: Theme) => merge<Theme>(state, next)

type EditorProviderProps = {
  children?: React.ReactNode
  theme?: Theme
}

export const EditorProvider = ({
  children,
  theme: propsTheme,
}: EditorProviderProps) => {
  const outer = useThemeUI()
  const [theme, setTheme] = React.useReducer(reducer, {
    ...(propsTheme || outer.theme),
  })
  const context: EditorContext = {
    ...outer,
    theme,
    setTheme,
  }

  return jsx(
    Context.Provider,
    {
      value: context,
    },
    jsx(Emotion.Provider, {
      value: theme,
      children,
    })
  )
}
