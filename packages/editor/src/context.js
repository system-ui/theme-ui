import { createContext, useContext } from 'react'

export const EditorContext = createContext(null)
export const useEditor = () => useContext(EditorContext)
