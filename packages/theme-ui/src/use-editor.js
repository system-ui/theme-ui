import { useEffect, useState } from 'react'
import { useThemeUI } from './context'

let __id = 0
const uuid = () => __id++

let useEditor = n => n
let useEditorState = () => ({})

if (process.env.NODE_ENV !== 'production') {
  useEditor = (props, meta) => {
    // console.log('useEditor', opts)
    const [id, setID] = useState()
    const context = useThemeUI()
    const { editor } = context

    const onClick = e => {
      if (typeof props.onClick === 'function') props.onClick(e)
      if (!e.shiftKey) return
      editor.select(id)
      e.stopPropagation()
    }

    useEffect(() => {
      setID(uuid())
    }, [])

    useEffect(() => {
      if (editor.elements && editor.elements[id]) return
      editor.register(id, { props, ...meta })
      console.log('register', id, editor.elements[id], {
        id,
        editor,
      })
    }, [id, editor.register])

    const state =
      (editor.elements && editor.elements[id] && editor.elements[id].props) ||
      props
    return {
      ...state,
      onClick,
    }
  }

  useEditorState = () => {
    const [selected, select] = useState()
    const [elements, setElements] = useState({})
    const register = (id, metadata) => {
      setElements({
        ...elements,
        [id]: metadata,
      })
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
