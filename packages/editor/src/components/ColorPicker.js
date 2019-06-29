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
      css={{
        width: '100%',
        display: 'grid',
        gridAutoFlow: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 1,
      }}
    >
      <span>{label}</span>
      <div css={{ position: 'relative ' }}>
        <div
          onClick={() => setIsEditing(true)}
          css={{
            width: 20,
            height: 20,
            backgroundColor: props.color,
            borderRadius: 10,
            border: '1px solid',
            borderColor: 'muted',
          }}
        />
        {isEditing && (
          <div
            ref={ref}
            css={{ position: 'absolute', left: '100%', top: 0, marginLeft: 1 }}
          >
            <ChromePicker {...props} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ColorPicker
