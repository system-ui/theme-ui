/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from '@theme-ui/core'
import { AssertTrue, IsExact, render, renderJSON } from '@theme-ui/test-utils'
import React, { forwardRef } from 'react'

import { Switch, SwitchProps } from '../src'

import { theme } from './__test-utils__'

describe(Switch.name, () => {
  test('accepts forwarded ref', () => {
    const CustomSwitch = forwardRef<HTMLInputElement, SwitchProps>(
      (props, ref) => <Switch ref={ref} {...props} />
    )

    let type: string | undefined

    render(
      <ThemeProvider theme={{}}>
        <CustomSwitch
          ref={(ref) => {
            type _ = AssertTrue<IsExact<typeof ref, HTMLInputElement | null>>
            type = ref?.type
          }}
        />
      </ThemeProvider>
    )

    expect(type).toEqual('checkbox')
  })

  test('containerSx and sx', () => {
    const json = renderJSON(
      <ThemeProvider theme={theme}>
        <Switch
          label="Subscribe for email updates"
          sx={{
            'input:checked ~ &': {
              backgroundColor: 'primary',
            },
          }}
          containerSx={{ my: 4 }}
        />
      </ThemeProvider>
    )
    expect(json).toMatchSnapshot()
  })
})
