/** @jsx jsx */
import { jsx } from 'theme-ui'
import {
  useState,
  useEffect,
} from 'react'

const IconSpan = props =>
  <span
    {...props}
    css={{
      width: 24,
      height: 24,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  />

const Thumb = ({ checked, color, ...props }) =>
  <div
    {...props}
    css={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 24,
      height: 24,
      borderRadius: 99999,
      bg: color,
      border: '1px solid',
      borderColor: 'primary',
      transitionProperty: 'transform',
      transitionDuration: '0.1s',
      transitionTimingFunction: 'ease-out',
    }}
    style={{
      transform: checked ? `translateX(100%)` : `translateX(0)`
    }}
  />

export const Toggle = ({
  checked,
  onClick,
  label,
  checkedIcon,
  uncheckedIcon,
  colors = {},
  ...props
}) =>
  <button
    {...props}
    type='button'
    role='switch'
    aria-checked={checked}
    aria-label={label}
    onClick={onClick}
    css={{
      appearance: 'none',
      color: checked ? 'background': 'inherit',
      bg: checked ? colors.active : colors.background,
      p: 0,
      m: 0,
      display: 'inline-flex',
      alignItems: 'center',
      width: 50,
      height: 26,
      fontFamily: 'inherit',
      fontSize: 0,
      borderRadius: 99999,
      border: '1px solid',
      borderColor: colors.border,
      position: 'relative',
      ':focus': {
        outline: 'none',
        div: {
          boxShadow: '0 0 4px',
          color: colors.active,
        }
      }
    }}>
    <IconSpan>
      {checkedIcon}
    </IconSpan>
    <IconSpan>
      {uncheckedIcon}
    </IconSpan>
    <Thumb
      color={colors.thumb}
      checked={checked}
    />
  </button>

const Label = props =>
  <span
    {...props}
    css={{
      fontSize: 10,
      fontWeight: 'bold',
    }}
  />

Toggle.defaultProps = {
  label: 'Toggle',
  colors: {
    background: 'muted',
    active: 'primary',
    border: 'gray',
    thumb: 'background',
  },
  checkedIcon: <Label>On</Label>,
  uncheckedIcon: <Label>Off</Label>,
}

export default Toggle
