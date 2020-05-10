import React from 'react'
import { jsx, Context, useThemeUI, merge, Theme } from 'theme-ui'
import { ThemeContext as Emotion } from '@emotion/core'
import { EditorContextValue } from './types'

const reducer = (state: Theme, next: Partial<Theme>) =>
  merge<Theme>(state, next)

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
  const context: EditorContextValue = {
    ...outer,
    theme,
    setTheme,
  }

  return jsx(
    Context.Provider,
    { value: context },
    jsx(Emotion.Provider, {
      value: theme,
      children,
    })
  )
}
