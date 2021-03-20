import { Theme, ThemeUIContextValue } from 'theme-ui'

export interface EditorContextValue extends ThemeUIContextValue {
  setTheme: React.Dispatch<Theme>
}
