/** @jsx jsx */
import { jsx } from 'theme-ui'
import Color from 'color'
import ColorPicker from './ColorPicker'

const flattenObject = object => {
  const result = {}
  function flatten(obj, prefix = '') {
    Object.keys(obj).forEach(key => {
      const value = obj[key]
      if (typeof value === 'object') {
        flatten(value, `${prefix}${key}.`)
      } else {
        result[`${prefix}${key}`] = value
      }
    })
  }
  flatten(object)
  return result
}

const toHex = raw => {
  try {
    return Color(raw).hex()
  } catch (e) {
    return raw
  }
}

const Colors = ({ theme, setTheme }) => {
  const colors = flattenObject(theme.colors)

  return (
    <section>
      <h2>Colors</h2>
      {Object.keys(colors).map(key => {
        const value = colors[key]
        return (
          <ColorPicker
            key={key}
            color={toHex(value)}
            onChange={({ hex }) => {
              setTheme({
                colors: {
                  [key]: hex,
                },
              })
            }}>
            <button
              key={key}
              title="Edit color"
              sx={{
                appearance: 'none',
                fontFamily: 'inherit',
                fontSize: 'inherit',
                px: 0,
                m: 0,
                py: 1,
                color: 'inherit',
                bg: 'transparent',
                border: 0,
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
              }}>
              <div
                sx={{
                  width: 24,
                  height: 24,
                  mr: 2,
                  bg: key,
                  borderRadius: 9999,
                  border: '1px solid',
                  borderColor: 'muted',
                }}
              />
              <div
                sx={{
                  fontSize: 0,
                }}>
                {key}
              </div>
            </button>
          </ColorPicker>
        )
      })}
    </section>
  )
}

export default Colors
