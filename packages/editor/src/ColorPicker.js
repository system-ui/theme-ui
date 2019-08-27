/** @jsx jsx */
import { useState, useEffect, useRef } from 'react'
import { jsx } from 'theme-ui'
import { ChromePicker } from 'react-color'

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}

const ColorPicker = ({ label, ...props }) => {
  const ref = useRef()
  const [isEditing, setIsEditing] = useState(false)

  useOnClickOutside(ref, () => setIsEditing(false))

  return (
    <div
      sx={{
        width: '100%',
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 1,
      }}>
      <span>{label}</span>
      <div sx={{ position: 'relative ' }}>
        <button
          onClick={() => setIsEditing(true)}
          sx={{
            appearance: 'none',
            width: 20,
            height: 20,
            backgroundColor: props.color,
            borderRadius: 10,
            border: '1px solid',
            borderColor: 'muted',
          }}
        />
        {isEditing && (
          <div ref={ref} sx={{ position: 'absolute', right: 24, top: 0 }}>
            <ChromePicker {...props} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorPicker
