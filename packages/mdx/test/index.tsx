/**
 * @jest-environment jsdom
 */

import { themed } from '../src'

describe(themed.name, () => {
  it('extracts styles from the theme', () => {
    expect(
      themed('footer')({ styles: { footer: { background: 'skyblue' } } })
    ).toStrictEqual({ background: 'skyblue' })
  })
})
