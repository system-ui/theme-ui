/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@theme-ui/test-utils'
import { Flex, ThemeUIProvider } from 'theme-ui'

test('accepts ref', async () => {
  let ref: HTMLElement | null = null

  render(
    <ThemeUIProvider theme={{}}>
      <Flex ref={(r) => (ref = r)} />
    </ThemeUIProvider>
  )

  expect(ref).toBeInstanceOf(HTMLDivElement)
})
