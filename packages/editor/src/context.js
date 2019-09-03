import { createContext, useContext } from 'react'
import { useThemeUI } from 'theme-ui'

export const EditorContext = createContext(null)
export const useEditor = () => {
  const themeui = useThemeUI()
  const editor = useContext(EditorContext)
  return editor || themeui
}
