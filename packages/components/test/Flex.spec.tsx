/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@theme-ui/test-utils'
import { Flex, ThemeProvider } from 'theme-ui'

test('accepts ref', async () => {
  let ref: HTMLElement | null = null

  render(
    <ThemeProvider theme={{}}>
      <Flex ref={(r) => (ref = r)} />
    </ThemeProvider>
  )

  expect(ref).toBeInstanceOf(HTMLDivElement)
})
