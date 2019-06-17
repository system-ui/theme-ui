// todo: replace with editable style guide UI components
import React from 'react'
import Color from 'color'

const toHex = raw => {
  try {
    return Color(raw).hex()
  } catch (e) {
    return raw
  }
}

export default ({
  theme = {},
  setTheme,
}) => theme !== null && (
  <form
    onSubmit={e => {
      e.preventDefault()
    }}>
    {theme.colors && (
      <div>
        <h2>Colors</h2>
        {Object.keys(theme.colors).map(key => {
          const value = theme.colors[key]
          if (!value) return false
          if (typeof value === 'object') {
            // todo
            return false
          }
          return (
            <label key={key}>
              {key}
              <input
                type='color'
                value={toHex(value)}
                onChange={e => {
                  setTheme({
                    colors: {
                      [key]: e.target.value
                    }
                  })
                }}
              />
            </label>
          )
        })}
      </div>
    )}
  </form>
)
