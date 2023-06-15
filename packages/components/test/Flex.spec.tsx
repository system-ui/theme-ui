/**
 * @jest-environment jsdom
 */

import { render } from '@theme-ui/test-utils'
import { ThemeUIProvider } from '@theme-ui/theme-provider'
import { Flex } from '../src/Flex'

test('accepts ref', async () => {
  let ref: HTMLElement | null = null

  render(
    <ThemeUIProvider theme={{}}>
      <Flex ref={(r) => (ref = r)} />
    </ThemeUIProvider>
  )

  expect(ref).toBeInstanceOf(HTMLDivElement)
})
