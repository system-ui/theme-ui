import { Theme, ContextValue } from 'theme-ui'

export type EditorContext = ContextValue & {
  setTheme: React.Dispatch<Theme>
}
