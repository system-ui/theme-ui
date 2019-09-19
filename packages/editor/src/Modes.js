/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState, useEffect } from 'react'
import Label from './Label'

const Select = props => (
  <select
    {...props}
    sx={{
      width: '100%',
    }}
  />
)

const Modes = ({ colorMode, theme, setColorMode }) => {
  const [value, setValue] = useState(colorMode)
  const modes = ['initial', ...Object.keys(theme.colors.modes || {})]

  useEffect(() => {
    if (value) {
      setColorMode(value)
    }
  }, [value])

  return (
    <section>
      <h2>Color Modes</h2>
      <label htmlFor="colormode">Color Mode</label>
      <Select
        id="colormode"
        name="colormode"
        value={value}
        onChange={e => setValue(e.target.value)}>
        {modes.map(mode => (
          <option key={mode}>{mode}</option>
        ))}
      </Select>
    </section>
  )
}

export default Modes
