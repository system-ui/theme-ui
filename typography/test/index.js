import React from 'react'
import toStyles from '../src'
import theme from 'typography-theme-wordpress-2016'

test('converts typography theme to styles object', () => {
  const styles = toStyles(theme)
  expect(typeof styles).toBe('object')
  expect(styles).toMatchSnapshot()
})
