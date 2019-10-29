/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { CustomPicker } from 'react-color'
import {
  Hue,
  Saturation,
  EditableInput,
} from 'react-color/lib/components/common'
import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover'

const round = (n, x = 0) => Math.floor(n * Math.pow(10, x)) / Math.pow(10, x)

const Lens = props => (
  <div
    sx={{
      width: 16,
      height: 16,
      borderRadius: 9999,
      border: '1px solid white',
      transform: 'translate(-8px, -8px)',
    }}
  />
)

const Handle = props => (
  <div
    sx={{
      width: 12,
      height: 12,
      borderRadius: 9999,
      backgroundColor: 'white',
      boxShadow: '0 0 2px rgba(0,0,0,.25)',
      transform: 'translate(-6px, -2px)',
    }}
  />
)

/** placeholder is used because react-color does not pass
 * HTML attributes to the element
 */
const Input = props => (
  <EditableInput
    {...props}
    placeholder={props.name}
    style={{
      input: {
        width: '100%',
        fontSize: 12,
        fontFamily: 'Menlo, monospace',
        margin: 0,
        padding: 0,
        border: 0,
        outline: 'none',
      },
      label: {
        display: 'none',
      },
    }}
  />
)

const Label = ({ width = '100%', flex = 1, ...props }) => (
  <label
    {...props}
    sx={{
      display: 'block',
      width,
      fontSize: 10,
      input: {
        ':focus': {
          color: 'primary',
          bg: 'highlight',
        },
      },
    }}
  />
)

export const Picker = CustomPicker(({ size = 256, ...props }) => {
  return (
    <div
      sx={{
        display: 'grid',
        p: 2,
        gridGap: 2,
        width: size,
        borderRadius: 4,
        bg: 'white',
        boxShadow: '0 2px 8px 1px rgba(0,0,0,.125)',
      }}>
      <div
        sx={{
          position: 'relative',
          width: '100%',
          height: 0,
          paddingBottom: '75%',
        }}>
        <Saturation {...props} pointer={Lens} />
      </div>
      <div
        sx={{
          position: 'relative',
          width: '100%',
          height: 8,
        }}>
        <Hue {...props} pointer={Handle} />
      </div>
      <div
        sx={{
          display: 'flex',
        }}>
        <Label>
          Hex
          <Input
            {...props}
            value={props.hex}
            name="hex"
            label="hex"
            onChange={val => {
              props.onChange(val)
            }}
          />
        </Label>
        <Label>
          Hue
          <Input
            {...props}
            value={round(props.hsl.h)}
            name="hue"
            label="h"
            onChange={val => {
              props.onChange({ ...props.hsl, ...val })
            }}
          />
        </Label>
        <Label>
          Saturation
          <Input
            {...props}
            value={round(props.hsl.s * 100)}
            name="saturation"
            label="s"
            onChange={({ s }) => {
              props.onChange({ ...props.hsl, s: s / 100 })
            }}
          />
        </Label>
        <Label>
          Lightness
          <Input
            {...props}
            value={round(props.hsl.l * 100)}
            name="lightness"
            label="l"
            onChange={({ l }) => {
              props.onChange({ ...props.hsl, l: l / 100 })
            }}
          />
        </Label>
      </div>
    </div>
  )
})

export const ColorPicker = ({ children, ...props }) => {
  const popover = usePopoverState()
  const hasChildren = !!children

  if (!hasChildren) {
    return <Picker {...props} />
  }

  return (
    <React.Fragment>
      <PopoverDisclosure
        {...popover}
        children={disclosure => <div {...disclosure}>{children}</div>}
      />
      <Popover
        {...popover}
        aria-label="Edit color"
        sx={{
          outline: 'none',
        }}>
        <Picker {...props} />
      </Popover>
    </React.Fragment>
  )
}

export default ColorPicker
