/** @jsx jsx */
import { useState, useRef } from 'react'
import { jsx } from 'theme-ui'
import { ChromePicker } from 'react-color'
import { useOnClickOutside } from '../hooks'

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
      }}
    >
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
