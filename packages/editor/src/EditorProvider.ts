import React, { useReducer } from 'react'
import { jsx, useThemeUI, merge, Theme } from 'theme-ui'
import { __ThemeUIInternalBaseThemeProvider } from '@theme-ui/core'
import { EditorContextValue } from './types'

const reducer = (state: Theme, next: Partial<Theme>) => merge(state, next)

export interface EditorProviderProps {
  children?: React.ReactNode
  theme?: Theme
}

export const EditorProvider = ({
  children,
  theme: propsTheme,
}: EditorProviderProps) => {
  const outer = useThemeUI()
  const [theme, setTheme] = useReducer(reducer, {
    ...(propsTheme || outer.theme),
  })

  const context: EditorContextValue = {
    ...outer,
    theme,
    setTheme,
  }

  return jsx(__ThemeUIInternalBaseThemeProvider, { context }, children)
}
