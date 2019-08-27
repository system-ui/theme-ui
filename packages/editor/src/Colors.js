import React from 'react'
import Color from 'color'

import Section from './Section'
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
    <Section heading="Colors">
      {Object.keys(colors).map(key => {
        const value = colors[key]
        return (
          <ColorPicker
            key={key}
            label={key}
            color={toHex(value)}
            onChange={({ hex }) => {
              setTheme({
                colors: {
                  [key]: hex,
                },
              })
            }}
          />
        )
      })}
    </Section>
  )
}

export default Colors
