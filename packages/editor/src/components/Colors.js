import React from 'react'
import set from 'lodash.set'
import Color from 'color'

import Section from './Section'
import ColorPicker from './ColorPicker'
import { flattenObject } from '../utils'

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
                colors: set({}, key, hex),
              })
            }}
          />
        )
      })}
    </Section>
  )
}

export default Colors
