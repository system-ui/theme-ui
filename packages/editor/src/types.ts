import { Theme, ThemeUIContextValue } from '@theme-ui/core'

export interface EditorContextValue extends ThemeUIContextValue {
  setTheme: React.Dispatch<Theme>
}
