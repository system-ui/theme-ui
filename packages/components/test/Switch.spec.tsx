/**
 * @jest-environment jsdom
 */

import { ThemeProvider } from '@theme-ui/core'
import { AssertTrue, IsExact, render } from '@theme-ui/test-utils'
import { forwardRef } from 'react'

import { Switch, SwitchProps } from '../src'

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
})
