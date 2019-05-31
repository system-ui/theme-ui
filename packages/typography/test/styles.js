import styles from '../src/styles'

test('snapshot', () => {
  expect(styles).toMatchSnapshot()
})
