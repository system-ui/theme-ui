/** @jsx jsx */
import { jsx } from '../src'
import renderer from 'react-test-renderer'

const renderJSON = (el: React.ReactElement) => renderer.create(el).toJSON()

describe('JSX', () => {
  test('accepts sx prop', () => {
    expect(
      renderJSON(
        <div
          sx={{
            // TypeScript support should autocomplete keys here
            mt: 10,
            px: 2,
          }}
        />
      )
    ).toMatchSnapshot()
  })
})
