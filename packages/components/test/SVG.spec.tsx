/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@theme-ui/test-utils'
import { ThemeProvider } from 'theme-ui'
import { SVG } from '../src/SVG'

test('accepts ref', async () => {
  let ref: SVGSVGElement | null = null

  render(
    <ThemeProvider theme={{}}>
      <SVG ref={(r) => (ref = r)} />
    </ThemeProvider>
  )

  expect(ref).toBeInstanceOf(SVGSVGElement)
})
