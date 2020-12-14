import { Theme, ContextValue } from 'theme-ui'

export interface EditorContextValue extends ContextValue {
  setTheme: React.Dispatch<Theme>
}
