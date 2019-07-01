import React, { useState, useEffect } from 'react'
import Section from './Section'
import Select from './Select'

const Modes = ({ colorMode, theme, setColorMode }) => {
  const [value, setValue] = useState(colorMode)
  const modes = ['initial', ...Object.keys(theme.colors.modes || {})]

  useEffect(() => {
    if (value) {
      setColorMode(value)
    }
  }, [value])

  return (
    <Section heading="Modes">
      <Select
        value={value}
        onChange={e => setValue(e.target.value)}
        options={modes}
      />
    </Section>
  )
}

export default Modes
