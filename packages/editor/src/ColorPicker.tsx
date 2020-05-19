/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import { CustomPicker, CustomPickerProps, HSLColor } from 'react-color'
import {
  EditableInput,
  Hue,
  Saturation,
} from 'react-color/lib/components/common'
import { EditableInputProps } from 'react-color/lib/components/common/EditableInput'
import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover'

const Lens = () => (
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

const Handle = () => (
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

type InputProps = React.PropsWithoutRef<EditableInputProps> & {
  name?: string
}

/** placeholder is used because react-color does not pass
 * HTML attributes to the element
 */
const Input = (props: InputProps) => (
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

type LabelProps = React.PropsWithoutRef<JSX.IntrinsicElements['label']> & {
  width?: string | number
  flex?: number
}

const Label = ({ width = '100%', flex = 1, ...props }: LabelProps) => (
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

type CustomPickerForwardedProps = {
  size?: number
}
export interface PickerProps
  extends CustomPickerForwardedProps,
    CustomPickerProps {}

export const Picker = CustomPicker<CustomPickerForwardedProps>(
  ({ size = 256, ...props }) => {
    return (
      <div
        sx={{
          display: 'grid',
          p: 2,
          gap: 2,
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
              onChange={(val) => {
                props.onChange(val)
              }}
            />
          </Label>
          <Label>
            Hue
            <Input
              {...props}
              value={Math.round(props.hsl!.h)}
              name="hue"
              label="h"
              // We need to cast to any because @types/react-color does not define types correctly
              onChange={({ h }: any) => {
                props.onChange({ ...props.hsl, h } as any)
              }}
            />
          </Label>
          <Label>
            Saturation
            <Input
              {...props}
              value={Math.round(props.hsl!.s * 100)}
              name="saturation"
              label="s"
              // We need to cast to any because @types/react-color does not define types correctly
              onChange={({ s }: any) => {
                props.onChange({ ...props.hsl, s: s / 100 } as any)
              }}
            />
          </Label>
          <Label>
            Lightness
            <Input
              {...props}
              value={Math.round(props.hsl!.l * 100)}
              name="lightness"
              label="l"
              // We need to cast to any because @types/react-color does not define types correctly
              onChange={({ l }: any) => {
                props.onChange({ ...props.hsl, l: l / 100 } as any)
              }}
            />
          </Label>
        </div>
      </div>
    )
  }
)

export interface ColorPickerProps extends React.PropsWithoutRef<PickerProps> {
  children?: React.ReactNode
}

export const ColorPicker = ({ children, ...props }: ColorPickerProps) => {
  const popover = usePopoverState()
  const hasChildren = !!children

  if (!hasChildren) {
    return <Picker {...props} />
  }

  return (
    <React.Fragment>
      <PopoverDisclosure
        {...popover}
        children={(disclosure) => <div {...disclosure}>{children}</div>}
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
