import React from 'react'
import { jsx, Context, useThemeUI, merge } from 'theme-ui'
import { ThemeContext as Emotion } from '@emotion/core'

const reducer = (state, next) => merge(state, next)

export const EditorProvider = ({
  children,
  theme: propsTheme,
}) => {
  const outer = useThemeUI()
  const [theme, setTheme] = React.useReducer(reducer, {
    ...(propsTheme || outer.theme),
  })
  const context = {
    ...outer,
    theme,
    setTheme,
  }

  return jsx(Context.Provider, {
    value: context,
  },
    jsx(Emotion.Provider, {
      value: theme,
      children,
    })
  )
}
