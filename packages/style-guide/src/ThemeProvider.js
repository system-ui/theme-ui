import React, { useContext } from 'react'
import { ThemeContext } from '@emotion/core'
import { Context, useTheme } from './context'

export const ThemeProvider = ({
  theme,
  children
}) => {
  const emotion = useContext(ThemeContext)
  const outer = useTheme()

  return (
    <Context.Provider
      value={{
        ...outer,
        ...emotion,
        ...theme,
      }}>
      {children}
    </Context.Provider>
  )
}
