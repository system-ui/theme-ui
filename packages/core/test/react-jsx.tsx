/** @jsx jsx */
import renderer from 'react-test-renderer'
import { renderJSON } from '@theme-ui/test-utils'

import { jsx } from '../src'

describe('JSX', () => {
  test('accepts sx prop', () => {
    expect(
      renderJSON(
        <div
          sx={{
            // TypeScript support should autocomplete keys here
            mt: 10,
            px: 2,
            scrollPaddingY: 2,
          }}
        />
      )
    ).toMatchSnapshot()
  })
})
