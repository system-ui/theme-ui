/** @jsx jsx */
import { jsx } from 'theme-ui'
import React, { useState } from 'react'
import Switch from '@theme-ui/switch'

export const SunIcon = ({
  color = 'currentcolor',
  size = 16,
  ...props
}) =>
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    css={{
      margin: '4px',
    }}
    fill={color}
    viewBox="0 0 24 24">
    <path d="M20 15.31L23.31 12 20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
  </svg>

export const MoonIcon = ({
  size = 16,
  color = 'currentcolor',
  ...props
}) =>
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    css={{
      margin: '4px',
    }}
    viewBox="0 0 24 24">
    <path d="M10 2c-1.82 0-3.53.5-5 1.35C7.99 5.08 10 8.3 10 12s-2.01 6.92-5 8.65C6.47 21.5 8.18 22 10 22c5.52 0 10-4.48 10-10S15.52 2 10 2z" />
  </svg>

export const SimpleSwitch = props => {
  const [ checked, setChecked ] = useState(false)

  return (
    <Switch
      {...props}
      checked={checked}
      onChange={e => {
        setChecked(!checked)
      }}
    />
  )
}

export const IconSwitch = props => {
  const [ checked, setChecked ] = useState(false)

  return (
    <Switch
      {...props}
      aria-label='Toggle dark mode'
      checked={checked}
      onChange={e => {
        setChecked(!checked)
      }}
      checkedIcon={<MoonIcon color='yellow' />}
      uncheckedIcon={<SunIcon color='orange' />}
      css={{
        bg: 'black',
      }}
    />
  )
}
