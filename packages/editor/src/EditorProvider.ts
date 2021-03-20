import React from 'react'
import { jsx, __ThemeUIContext, useThemeUI, merge, Theme } from 'theme-ui'
import { ThemeContext as Emotion } from '@emotion/react'
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
  const [theme, setTheme] = React.useReducer(reducer, {
    ...(propsTheme || outer.theme),
  })
  const context: EditorContextValue = {
    ...outer,
    theme,
    setTheme,
  }

  return jsx(
    __ThemeUIContext.Provider,
    { value: context },
    jsx(Emotion.Provider, {
      value: theme,
      children,
    })
  )
}
