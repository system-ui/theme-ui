import { forwardRef, useContext, useEffect, useState } from 'react'
import { ThemeContext } from '@emotion/core'
import isPropValid from '@emotion/is-prop-valid'
import jsx from './jsx'
import { useThemeUI } from './context'

let __id = 0
const uuid = () => 'tx' + (__id++).toString(36)

let useEditableState = props => props

if (process.env.NODE_ENV !== 'production') {
  console.log('dev useEditableState')
  useEditableState = (props, tag) => {
    const context = useThemeUI()
    const [id, setID] = useState()
    const { editor } = context

    useEffect(() => {
      if (!id) {
        const i = uuid()
        setID(i)
      } else {
        if (editor.elements[id]) return
        if (typeof editor.register !== 'function') return
        editor.register(id, {
          tag,
          props,
        })
      }
    }, [editor, id])
    const onClick = e => {
      if (e.shiftKey) {
        editor.select(id)
        e.stopPropagation()
      }
      if (typeof props.onClick === 'function') props.onClick(e)
    }
    return {
      ...props,
      onClick,
    }
    // return id && context.elements[id] || props
  }
}

export const styled = tag => (...args) => {
  const shouldForwardProps = typeof tag === 'function'
  const Styled = forwardRef(({ as, ..._props }, ref) => {
    const props = useEditableState(_props, tag)
    const theme = useContext(ThemeContext)

    let nextProps = shouldForwardProps ? props : {}
    let styles = {}

    args.forEach(arg => {
      const style = typeof arg === 'function' ? arg({ theme, ...props }) : arg
      Object.assign(styles, style)
    })

    if (!shouldForwardProps) {
      for (let key in props) {
        if (!isPropValid(key)) continue
        nextProps[key] = props[key]
      }
    }

    return jsx(as || tag, {
      ...nextProps,
      ref,
      css: styles,
    })
  })
  return Styled
}

export default styled
