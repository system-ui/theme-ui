import { Theme, ContextValue } from 'theme-ui'

export type EditorContextValue = ContextValue & {
  setTheme: React.Dispatch<Theme>
}
