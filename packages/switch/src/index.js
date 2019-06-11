/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, {
  useState,
  useEffect,
} from 'react'
import ReactSwitch from 'react-switch'

export const Switch = props =>
  <ReactSwitch
    {...props}
    css={{
      bg: 'primary',
    }}
  />

Switch.defaultProps = {
  checkedIcon: false,
  uncheckedIcon: false,
  height: 24,
  width: 48,
  handleDiameter: 24,
  offColor: false,
  onColor: false,
}

export default Switch
