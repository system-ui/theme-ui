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

const Label = props =>
  <label
    {...props}
    style={{
      display: 'block'
    }}
  />

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
            <Label key={key}>
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
            </Label>
          )
        })}
      </div>
    )}
    {theme.fonts && (
      <div>
        <h2>Fonts</h2>
        {Object.keys(theme.fonts).map(key => (
          <Label key={key}>
            {key}
            <input
              type='text'
              value={theme.fonts[key]}
              onChange={e => {
                setTheme({
                  fonts: {
                    [key]: e.target.value
                  }
                })
              }}
            />
          </Label>
        ))}
      </div>
    )}
    {theme.fontSizes && (
      <div>
        <h2>Font Sizes</h2>
          {Array.isArray(theme.fontSizes) ? (
            theme.fontSizes.map((n, i) => (
              <Label key={i}>
                <input
                  type='number'
                  value={n}
                  onChange={e => {
                    const n = parseInt(e.target.value)
                    setTheme({
                      fontSizes: [
                        ...theme.fontSizes.slice(0, i),
                        n,
                        ...theme.fontSizes.slice(i + 1),
                      ]
                    })
                  }}
                />
                (Array)
              </Label>
            ))
          ): (
            Object.keys(theme.fontSizes).map(key => (
              <Label key={key}>
                font size {key}
                <input
                  type='number'
                  value={theme.fontSizes[key]}
                  onChange={e => {
                    const n = parseInt(e.target.value)
                    setTheme({
                      fontSizes: {
                        [key]: n
                      }
                    })
                  }}
                />
              </Label>
            ))
          )}
      </div>
    )}
  </form>
)
