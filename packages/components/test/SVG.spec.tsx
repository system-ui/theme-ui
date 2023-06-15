/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@theme-ui/test-utils'
import { ThemeUIProvider } from '@theme-ui/theme-provider'
import { SVG } from '../src/SVG'

test('accepts ref', async () => {
  let ref: SVGSVGElement | null = null

  render(
    <ThemeUIProvider theme={{}}>
      <SVG ref={(r) => (ref = r)} />
    </ThemeUIProvider>
  )

  expect(ref).toBeInstanceOf(SVGSVGElement)
})
