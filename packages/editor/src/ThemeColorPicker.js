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
  const options = Object.keys(colors)
    .map(key => colors[key])
    .filter(color => typeof color === 'string')
    .filter(color => /^#/.test(color))
  const onChange = color => {
    const key = Object.entries(colors).find(([k, v]) => v === color.hex)
    console.log({ key })
    props.onChange(key || color.hex)
  }
  console.log(props.value, colors[props.value])

  return (
    <React.Fragment>
      <PopoverDisclosure
        {...popover}
        children={disclosure => (
          <div {...disclosure}>
            {children}
            <pre children={options.join(', ')} />
          </div>
        )}
      />
      <Popover {...popover} aria-label="Choose Color">
        <CompactPicker
          colors={options}
          {...props}
          value={colors[props.value] || props.value}
          onChange={onChange}
        />
      </Popover>
    </React.Fragment>
  )
}

export default ThemeColorPicker
