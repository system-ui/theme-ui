/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from '@theme-ui/core'
import { AssertTrue, IsExact, render, renderJSON } from '@theme-ui/test-utils'
import React, { forwardRef } from 'react'

import { Checkbox, CheckboxProps } from '../src'

import { theme } from './__test-utils__'

describe(Checkbox.name, () => {
  test('accepts forwarded ref', () => {
    const CustomCheckbox = forwardRef<HTMLInputElement, CheckboxProps>(
      (props, ref) => <Checkbox ref={ref} {...props} />
    )

    let type: string | undefined

    render(
      <ThemeProvider theme={{}}>
        <CustomCheckbox
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
        <Checkbox
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
