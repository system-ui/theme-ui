/** @jsx jsx */
import { jsx, useThemeUI, Theme } from 'theme-ui'
import React from 'react'
import tinycolor from 'tinycolor2'
import { GithubPicker, ColorState } from 'react-color'
import { usePopoverState, Popover, PopoverDisclosure } from 'reakit/Popover'

export interface ThemeColorPickerProps {
  children?: React.ReactNode
  theme?: Theme
  value?: string | number
  onChange: (color: string | ColorState) => void
}

export const ThemeColorPicker = ({
  children,
  theme,
  ...props
}: ThemeColorPickerProps) => {
  const popover = usePopoverState()
  const context = useThemeUI()
  // todo: look into supporting v0.2 functionality
  // const { colors } = theme || context.theme || {}
  const _theme = theme || context.theme || {}
  const colors = _theme.colors || {}
  // bug: only supports flat color scales
  const value = String(props.value && (colors[props.value] || props.value))
  const options = [
    'transparent',
    ...Object.keys(colors)
      .map((key) => colors[key])
      .filter((color): color is string => typeof color === 'string')
      .filter((color) => /^#/.test(color)),
  ]
  const onChange = (color: ColorState) => {
    const [key] =
      Object.entries(colors).find(
        ([k, v]) => tinycolor(v).toHexString() === color.hex
      ) || []

    props.onChange(key || color.hex || color)
  }
  const onChangeComplete = () => {
    popover.hide()
  }

  return (
    <React.Fragment>
      <PopoverDisclosure
        {...popover}
        children={(disclosure) => (
          <div
            {...disclosure}
            style={{
              backgroundColor: value,
            }}
            sx={{
              width: 32,
              height: 32,
              border: '1px solid',
              borderColor: 'lightgray',
            }}>
            {children}
          </div>
        )}
      />
      <Popover
        {...popover}
        aria-label="Choose Color"
        style={{
          zIndex: popover.visible ? 1 : undefined,
        }}>
        <GithubPicker
          colors={options}
          triangle="hide"
          {...props}
          color={value}
          onChange={onChange}
          onChangeComplete={onChangeComplete}
        />
      </Popover>
    </React.Fragment>
  )
}

export default ThemeColorPicker
