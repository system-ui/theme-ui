import { createContext, useContext } from 'react'

export const EditorContext = createContext(null)
export const useEditorContext = () => useContext(EditorContext)
