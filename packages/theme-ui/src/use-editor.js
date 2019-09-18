import { useEffect, useState } from 'react'
import { useThemeUI } from 'theme-ui'

let __id = 0
const uuid = () => __id++

let useEditor = n => n
let useEditorState = () => ({})

if (process.env.NODE_ENV !== 'production') {
  useEditor = (props, opts) => {
    console.log('useEditor', opts)
    const [id, setID] = useState()
    const context = useThemeUI()
    const { editor } = context

    useEffect(() => {
      setID(uuid())
    }, [])

    useEffect(() => {
      console.log({
        id,
        editor,
      })
    }, [id, editor])

    return {
      ...props,
    }
  }

  useEditorState = () => {
    const [selected, select] = useState()
    const [elements, setElements] = useState({})
    const register = (id, metadata) => {
      setElements(el => ({
        ...el,
        [id]: metadata,
      }))
    }
    return {
      selected,
      select,
      elements,
      register,
    }
  }
}

export { useEditor, useEditorState }
export default useEditor
