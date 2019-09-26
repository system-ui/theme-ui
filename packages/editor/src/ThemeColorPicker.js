/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { CompactPicker } from 'react-color'
import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover'
import { useEditor } from './context'

export const ThemeColorPicker = ({ children, ...props }) => {
  const popover = usePopoverState()
  const context = useEditor()
  const { colors } = context.theme
  // todo: general flatten colors utils
  const value = colors[props.value] || props.value
  const options = Object.keys(colors)
    .map(key => colors[key])
    .filter(color => typeof color === 'string')
    .filter(color => /^#/.test(color))
  const onChange = color => {
    const c = Object.entries(colors).find(([k, v]) => v === color.hex)
    const key = c && c[0]
    props.onChange(key || color.hex || color)
  }

  return (
    <React.Fragment>
      <PopoverDisclosure
        {...popover}
        children={disclosure => (
          <div
            {...disclosure}
            style={{
              backgroundColor: value,
            }}
            sx={{
              width: 24,
              height: 24,
            }}>
            {children}
          </div>
        )}
      />
      <Popover
        {...popover}
        aria-label="Choose Color"
        style={{
          zIndex: popover.visible ? 1 : null,
        }}>
        <CompactPicker
          colors={options}
          {...props}
          color={value}
          onChange={onChange}
        />
      </Popover>
    </React.Fragment>
  )
}

export default ThemeColorPicker
