import React from 'react'
import { Theme } from '@theme-ui/css'
import { ContextValue } from '@theme-ui/core'

export type EditorContext = ContextValue & {
  setTheme: React.Dispatch<Theme>
}
